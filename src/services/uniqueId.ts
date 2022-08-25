export function uniqueId(userEmail: string): string {
  const emailSplited = userEmail.split("@")[0].split("");
  const desordered = emailSplited.sort(() => Math.random() - 0.5);
  const randomNumber1 = Math.random() * 1000 * Math.random();
  const randomNumber2 = Math.random() * 1000 * Math.random();
  return `${desordered.join("")}${randomNumber1}${Date.now()}${randomNumber2}`;
}
