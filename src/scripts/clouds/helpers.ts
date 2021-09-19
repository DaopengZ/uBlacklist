import * as S from 'microstruct';
import { apis } from '../apis';
import { ALT_FLOW_REDIRECT_URL } from '../constants';
import { HTTPError, UnexpectedResponse } from '../utilities';

export type AuthorizeParams = {
  client_id: string;
  [key: string]: string;
};

export function shouldUseAltFlow(): (os: string) => boolean {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return os => {
    // #if CHROME
    return false;
    /* #elif FIREFOX
    return os === 'android';
    */
    /* #else
    return true;
    */
    // #endif
  };
}

async function launchAltFlow(params: { url: string }): Promise<string> {
  const [{ id: openerTabId }] = await apis.tabs.query({ active: true, currentWindow: true });
  if (openerTabId == null) {
    throw new Error('failed to get the current tab');
  }
  const { id: authorizationTabId } = await apis.tabs.create({
    openerTabId,
    url: params.url,
  });
  if (authorizationTabId == null) {
    throw new Error('failed to open the authorization tab');
  }
  return new Promise<string>((resolve, reject) => {
    const [onUpdated, onRemoved] = [
      (tabId: number, _changeInfo: apis.tabs._OnUpdatedChangeInfo, tab: apis.tabs.Tab) => {
        if (tabId === authorizationTabId && tab.url?.startsWith(ALT_FLOW_REDIRECT_URL)) {
          resolve(tab.url);
          apis.tabs.onUpdated.removeListener(onUpdated);
          apis.tabs.onRemoved.removeListener(onRemoved);
          void apis.tabs.update(openerTabId, { active: true }).then(() => apis.tabs.remove(tabId));
        }
      },
      (tabId: number) => {
        if (tabId === authorizationTabId) {
          reject(new Error('the authorization tab was closed'));
          apis.tabs.onUpdated.removeListener(onUpdated);
          apis.tabs.onRemoved.removeListener(onRemoved);
          void apis.tabs.update(openerTabId, { active: true });
        }
      },
    ];
    apis.tabs.onUpdated.addListener(onUpdated);
    apis.tabs.onRemoved.addListener(onRemoved);
  });
}

export function authorize(
  url: string,
  params: Readonly<AuthorizeParams>,
): (useAltFlow: boolean) => Promise<{ authorizationCode: string }> {
  return async (useAltFlow: boolean) => {
    const authorizationURL = new URL(url);
    authorizationURL.search = new URLSearchParams({
      response_type: 'code',
      redirect_uri: useAltFlow ? ALT_FLOW_REDIRECT_URL : apis.identity.getRedirectURL(),
      ...params,
    }).toString();
    const redirectURL = await (useAltFlow
      ? launchAltFlow({ url: authorizationURL.toString() })
      : apis.identity.launchWebAuthFlow({
          url: authorizationURL.toString(),
          interactive: true,
        }));
    const redirectParams: Record<string, string> = {};
    for (const [key, value] of new URL(redirectURL).searchParams.entries()) {
      redirectParams[key] = value;
    }
    if (S.is(redirectParams, S.object({ code: S.string() }))) {
      return { authorizationCode: redirectParams.code };
    } else if (S.is(redirectParams, S.object({ error: S.string() }))) {
      throw new Error(redirectParams.error);
    } else {
      throw new UnexpectedResponse(redirectParams);
    }
  };
}

export type GetAccessTokenParams = {
  client_id: string;
  client_secret: string;
  [key: string]: string;
};

export function getAccessToken(
  url: string,
  params: Readonly<GetAccessTokenParams>,
): (
  authorizationCode: string,
  useAltFlow: boolean,
) => Promise<{ accessToken: string; expiresIn: number; refreshToken: string }> {
  return async (authorizationCode, useAltFlow) => {
    const response = await fetch(url, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: useAltFlow ? ALT_FLOW_REDIRECT_URL : apis.identity.getRedirectURL(),
        ...params,
      }),
    });
    if (response.ok) {
      const responseBody: unknown = await response.json();
      if (
        !S.is(
          responseBody,
          S.object({
            access_token: S.string(),
            expires_in: S.number(),
            refresh_token: S.string(),
          }),
        )
      ) {
        throw new UnexpectedResponse(responseBody);
      }
      return {
        accessToken: responseBody.access_token,
        expiresIn: responseBody.expires_in,
        refreshToken: responseBody.refresh_token,
      };
    } else {
      throw new HTTPError(response.status, response.statusText);
    }
  };
}

export type RefreshAccessTokenParams = {
  client_id: string;
  client_secret: string;
  [key: string]: string;
};

export function refreshAccessToken(
  url: string,
  params: Readonly<RefreshAccessTokenParams>,
): (refreshToken: string) => Promise<{ accessToken: string; expiresIn: number }> {
  return async refreshToken => {
    const response = await fetch(url, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        ...params,
      }),
    });
    if (response.ok) {
      const responseBody: unknown = await response.json();
      if (!S.is(responseBody, S.object({ access_token: S.string(), expires_in: S.number() }))) {
        throw new UnexpectedResponse(responseBody);
      }
      return { accessToken: responseBody.access_token, expiresIn: responseBody.expires_in };
    } else {
      throw new HTTPError(response.status, response.statusText);
    }
  };
}
