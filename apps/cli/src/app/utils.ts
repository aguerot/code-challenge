import { User } from '@aguerot/consent-management';

export function serialise(user: User): string {
  return `${user.id} | ${user.email} | ${user.consents.map(c => `${c.id}:${c.enabled}`).join(',')}}`;
}
