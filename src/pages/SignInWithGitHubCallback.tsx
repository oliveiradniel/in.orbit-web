interface SignInWithGitHubCallbackParams {
  code: string;
}

export function SignInWithGitHubCallback({
  code,
}: SignInWithGitHubCallbackParams) {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1>{code}</h1>
    </div>
  );
}
