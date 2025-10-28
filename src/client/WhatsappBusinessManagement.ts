import { WhatsappBusinessManagementApi } from "@/api/WhatsappBusinessManagement";
import {
  TemplateCreateData,
  TemplateCreateResponse,
  TemplateData,
  TemplateFields,
  TemplateResponse,
} from "@/types/Templates";
import axios, { AxiosResponse } from "axios";
import { validateTemplateData, validateTemplateName } from "./helpers/TemplateCreateDataValidator";

export class WhatsappBusinessManagementClient {
  token: string = "";
  wabaId?: string;
  apiVersion: string = "v24.0";
  private _api?: WhatsappBusinessManagementApi;

  constructor(token: string, wabaId?: string) {
    this.token = token;
    this.wabaId = wabaId;

    this._api = new WhatsappBusinessManagementApi(this.token, this.apiVersion, axios.create());
  }

  /**
   * Get all Templates for a WhatsApp Business Account
   * @param wabaId WhatsApp Business Account ID
   * @param fields Array of fields to be returned in the template response
   * -- @example ["id", "name", "category"]
   * @returns Promise<TemplateResponse>
   */
  async getAllTemplates<F extends TemplateFields>(
    wabaId?: string,
    fields?: Array<Extract<TemplateFields, F>>,
  ): Promise<TemplateResponse<F | "id">> {
    if (this.wabaId === undefined && wabaId === undefined) {
      throw new Error("WhatsApp Business Account ID is required");
    }
    return this._api!.getAllTemplates(this.wabaId ?? wabaId!, fields);
  }

  /**
   * Get a Template for a WhatsApp Business Account
   * @param templateId Template ID
   * @param fields Array of fields to be returned in the template response
   * -- @example ["id", "name", "category"]
   * @returns Promise<TemplateData>
   */
  async getTemplateById<F extends TemplateFields>(
    templateId: string,
    fields?: Array<Extract<TemplateFields, F>>,
  ): Promise<TemplateData | Pick<TemplateData, F | "id">> {
    return this._api!.getTemplateById(templateId, fields);
  }

  /**
   * @param name Template name
   * @param wabaId WhatsApp Business Account ID
   * @returns Promise<TemplateResponse>
   */
  async getTemplateByName<F extends TemplateFields>(
    name: string,
    wabaId?: string,
    fields?: Array<Extract<TemplateFields, F>>,
  ): Promise<TemplateResponse<F | "id">> {
    if (this.wabaId === undefined && wabaId === undefined) {
      throw new Error("WhatsApp Business Account ID is required");
    }

    return await this._api!.getTemplateByName(this.wabaId ?? wabaId!, name, fields);
  }

  /**
   * Create a Template for a WhatsApp Business Account
   * @param templateData Template data to be created
   * @returns Promise<TemplateCreateResponse>
   */
  async createTemplate(templateData: TemplateCreateData): Promise<TemplateCreateResponse> {
    if (this.wabaId === undefined) {
      throw new Error("WhatsApp Business Account ID is required");
    }

    validateTemplateName(templateData.name);

    // More info https://developers.facebook.com/docs/whatsapp/message-templates/guidelines#common-rejection-reasons
    validateTemplateData(templateData);
    return this._api!.createTemplate(this.wabaId, templateData);
  }
}
