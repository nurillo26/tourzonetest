// format text
// "pendingSupplier" => "Pending Supplier"
export const capitalizeWords = (str: string): string =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
