import axios, { AxiosInstance, AxiosError, AxiosResponse, isAxiosError } from "axios";
import {
  TemplateCreateData,
  TemplateCreateResponse,
  TemplateData,
  TemplateFields,
  TemplateResponse,
} from "../types/Templates";

export class WhatsappBusinessManagementApi {
  private token: string;
  private apiVersion: string;
  private session: AxiosInstance;

  constructor(token: string, apiVersion: string, session: AxiosInstance) {
    this.apiVersion = apiVersion;
    this.session = axios.create(); // TODO: Use session from param.
    this.token = token;
    this._setHeaders();
  }

  private _setHeaders(): void {
    this.session.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
    this.session.defaults.baseURL = `https://graph.facebook.com/${this.apiVersion}`;
  }

  private _handleError(error: AxiosError): void {
    if (isAxiosError(error)) {
      console.error("Error: ", error.response?.data);
    }
  }

  private _doRequest<T, D>(method: string, url: string, data?: D): Promise<AxiosResponse<T>> {
    return this.session.request<T>({
      method,
      url,
      data,
    });
  }

  private _buildQueryParams(params: { fields?: Array<TemplateFields>; name?: string }): string {
    const searchParams = new URLSearchParams();
    if (params.fields && params.fields.length > 0) {
      searchParams.set("fields", params.fields.join(","));
    }
    if (params.name) {
      searchParams.set("name", params.name);
    }
    return searchParams.toString();
  }

  async getAllTemplates(wabaId: string, fields?: Array<TemplateFields>): Promise<TemplateResponse> {
    const query = this._buildQueryParams({ fields });
    return this._doRequest<TemplateResponse, any>("GET", `/${wabaId}/message_templates?${query}`).then(
      (response) => response.data,
    );
  }

  async getTemplateById(templateId: string, fields?: Array<TemplateFields>): Promise<TemplateData> {
    const query = this._buildQueryParams({ fields });
    return this._doRequest<TemplateData, any>("GET", `/${templateId}?${query}`).then((response) => response.data);
  }

  async getTemplateByName(wabaId: string, name: string, fields?: Array<TemplateFields>): Promise<TemplateResponse> {
    const query = this._buildQueryParams({ fields, name });
    return this._doRequest<TemplateResponse, any>("GET", `/${wabaId}/message_templates?name=${name}&${query}`).then(
      (response) => response.data,
    );
  }

  async createTemplate(wabaId: string, data: TemplateCreateData): Promise<TemplateCreateResponse> {
    return this._doRequest<TemplateCreateResponse, TemplateCreateData>("POST", `/${wabaId}/message_templates`, data)
      .then((response) => response.data)
      .catch((error) => {
        this._handleError(error);
        throw error;
      });
  }

  // TODO: Implement other methods like updateTemplate, deleteTemplate, etc.
}
