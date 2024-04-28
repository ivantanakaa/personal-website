export function dateFormatMonthYear(date: string) {
  return new Date(date)
    .toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    })
    .replace(" ", ". ");
}
export function dateFormatYear(date: string) {
    return new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
      });
  }
  