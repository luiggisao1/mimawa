import { WhatsappBusinessManagementClient } from "@/client/WhatsappBusinessManagement";
jest.mock("@/api/WhatsappBusinessManagement");

jest.mock("@/api/WhatsappBusinessManagement", () => {
  return {
    WhatsappBusinessManagementApi: jest.fn().mockImplementation(() => {
      return {
        getAllTemplates: jest.fn().mockResolvedValue({ data: [{ id: "1", name: "t1" }] }),
        getTemplateById: jest.fn().mockResolvedValue({ id: "1", name: "t1" }),
        getTemplateByName: jest.fn().mockResolvedValue({ data: [{ id: "1", name: "t1" }] }),
        createTemplate: jest.fn().mockResolvedValue({ id: "created" }),
      };
    }),
  };
});

describe("WhatsappBusinessManagementClient", () => {
  const token = "token-123";
  const wabaId = "waba-1";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws when getting all templates without wabaId", async () => {
    const client = new WhatsappBusinessManagementClient(token);
    await expect(client.getAllTemplates()).rejects.toThrow("WhatsApp Business Account ID is required");
  });

  it("calls api.getAllTemplates when wabaId provided in constructor", async () => {
    const client = new WhatsappBusinessManagementClient(token, wabaId);
    const resp = await client.getAllTemplates();
    expect(resp).toEqual({ data: [{ id: "1", name: "t1" }] });
  });
});
