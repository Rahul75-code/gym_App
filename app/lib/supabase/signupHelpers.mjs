export function resolveSignupEmail(email, fullName = '', seed = Date.now()) {
  const trimmedEmail = email?.trim();
  if (trimmedEmail) {
    return trimmedEmail.toLowerCase();
  }

  const normalizedName = (fullName || 'member')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'member';

  return `${normalizedName}-${seed}@fitforge.local`;
}
