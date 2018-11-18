
export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getAsyncToken();
    }
  };
}
