import { Component } from "./Components";
import { Prettify, SupportedLanguages } from "./utils";

export interface TemplateResponse<F extends TemplateFields = TemplateFields> {
  data: [F] extends [never] ? TemplateData[] : [F] extends [TemplateFields] ? Pick<TemplateData, F>[] : never;
  paging: Paging;
  // TODO: Add summary property: https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/#fields
}

export interface TemplateData {
  /**
   * The id for a template
   */
  id: string;
  /**
   * The category for a template
   */
  category: TemplateCategory;
  /**
   * An array of JSON objects describing the message template components.
   */
  components: Component[];
  /**
   * A list of supported languages that are available for each template
   */
  language: string[] | string;
  /**
   * The name for a message template
   */
  name: string;
  /**
   * The parameter format of the template
   */
  parameter_format: "POSITIONAL" | "NAMED";
  /**
   * The quality score for a template
   */
  quality_score: TemplateQualityScore;
  /**
   * The review status for a template
   */
  status: TemplateStatus;
}

export interface TemplateCreateData {
  /**
   * The category for a template
   * @see [Template categories](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#categories)
   */
  category: TemplateCategory;
  /**
   * Components that make up the template. Must include at least one BodyComponent in any position.
   */
  components: Component[];
  /**
   * A list of supported languages that are available for each template
   */
  language: SupportedLanguages;
  /**
   * The name for a message template
   */
  name: string;
  /**
   * The parameter format of the template
   */
  parameter_format: "POSITIONAL" | "NAMED";
  /**
   * The exact name of the Template Library template.
   */
  library_template_name?: string;
}

export interface TemplateCreateResponse {
  id: string;
  status: TemplateStatus;
  category: TemplateCategory;
}

export type TemplateCategory = "AUTHENTICATION" | "MARKETING" | "UTILITY";

type TemplateQualityScore = "GREEN" | "YELLOW" | "RED" | "UNKNOWN";

type TemplateStatus =
  | "APPROVED"
  | "IN_APPEAL"
  | "PENDING"
  | "REJECTED"
  | "PENDING_DELETION"
  | "DELETED"
  | "DISABLED"
  | "PAUSED"
  | "LIMIT_EXCEEDED"
  | "ARCHIVED";

type cursors = "before" | "after";

export interface Paging {
  cursors: { [key in cursors]: string };
}

export type TemplateFields = Prettify<keyof TemplateData>;
