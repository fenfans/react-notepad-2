export function isPublicApi (pathName) {
  return /^\/?api\/.*/.test(pathName);
}