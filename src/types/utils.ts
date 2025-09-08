export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type SupportedLanguages = "af" | "sq" | "en_US" | "es" | "es_EC" | "es_CO" | "es_MX";
