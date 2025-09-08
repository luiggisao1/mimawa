import { Prettify } from "./utils";

/**
 * https://developers.facebook.com/docs/graph-api/reference/whats-app-business-hsm-whats-app-hsm-component-get/
 * More information about the type of a template component: https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components
 */
export type Component = BodyComponent | HeaderComponent | FooterComponent | ButtonsComponent;

interface ExampleComponents {
  header_text?: string[];
  header_text_named_params?: ExampleNamedParams[];
  header_handle?: string[];
  body_text_named_params?: ExampleNamedParams[];
  body_text?: string[][];
}

interface ExampleNamedParams {
  param_name: string;
  example: string;
}

export interface HeaderComponent {
  type: "HEADER";
  format: "TEXT" | "IMAGE" | "DOCUMENT" | "VIDEO" | "LOCATION";
  text: string;
  example?: Prettify<Pick<ExampleComponents, "header_text" | "header_text_named_params" | "header_handle">>;
}

export interface BodyComponent {
  type: "BODY";
  text: string;
  example?: Prettify<Pick<ExampleComponents, "body_text" | "body_text_named_params">>;
}

export interface FooterComponent {
  type: "FOOTER";
  text: string;
}

export interface ButtonsComponent {
  type: "BUTTONS";
  /**
   * https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components
   */
  buttons?: ButtonsType[];
}

/**
 * TODO: Complete missing buttons type:  https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#buttons
 */
export type ButtonsType = CopyCodeButtons | FlowsButtons;

/**
 * Copy code buttons copy a text string (defined when the template is sent in a template message) to the device's clipboard when tapped by the app user. Templates are limited to one copy code button.
 */
export interface CopyCodeButtons {
  type: "COPY_CODE";
  /**
   * String to be copied to device's clipboard when tapped by the app user. Maximum 15 characters
   */
  example: string;
}

/**
 * Flows buttons are for sending Flows Messages as templates.
 *
 * Flows can quickly be built in the playground and attached as JSON, or an existing Flow ID can be specified.
 */
export interface FlowsButtons {
  type: "FLOW";
  // TODO: Complete missing properties https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#flows-buttons
}
