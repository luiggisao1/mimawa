import { TemplateCreateData } from "@/types/Templates";
import { Component } from "@/types/Components";

export function validateTemplateName(name: string): void {
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    throw new Error("The template name must only contain alphanumeric characters and underscores.");
  }

  if (name.length > 512) {
    throw new Error("The template name must not exceed 512 characters.");
  }
}

export function validateTemplateData(templateData: TemplateCreateData): void {
  if (!hasBodyComponent(templateData)) {
    throw new Error("The template must include a BODY component.");
  }

  if (!hasUniqueComponents(templateData)) {
    throw new Error("The template contains repeated components.");
  }

  if (!hasNamedVariablesWhenNeeded(templateData)) {
    throw new Error(
      "Named parameters must not contain numbers as variables, e.g., {{1}}. Use named parameters like {{name}}.",
    );
  }

  if (!hasPositionalVariablesWhenNeeded(templateData)) {
    throw new Error("Positional parameters must contain variables like {{1}}, {{2}}, etc.");
  }
}

function hasBodyComponent(templateData: TemplateCreateData): boolean {
  return templateData.components.some((component: Component) => component.type === "BODY");
}

function hasUniqueComponents(templateData: TemplateCreateData): boolean {
  const componentTypes = templateData.components.map((component: Component) => component.type);
  const uniqueComponentTypes = new Set(componentTypes);
  return componentTypes.length === uniqueComponentTypes.size;
}

function hasNamedVariablesWhenNeeded(templateData: TemplateCreateData): boolean {
  return hasVariableAccordingToFormat(templateData, "NAMED", /{{[a-zA-Z_][a-zA-Z0-9_]*}}/g);
}

function hasPositionalVariablesWhenNeeded(templateData: TemplateCreateData): boolean {
  return hasVariableAccordingToFormat(templateData, "POSITIONAL", /{{\d+}}/g);
}

function hasVariableAccordingToFormat(
  templateData: TemplateCreateData,
  format: "NAMED" | "POSITIONAL",
  regex: RegExp,
): boolean {
  if (templateData.parameter_format === format) {
    return templateData.components.every((component: Component) => {
      if (component.type === "BODY" || component.type === "HEADER") {
        const positionalVariables = component.text.match(regex);
        return positionalVariables !== null;
      }
      return true;
    });
  }
  return true;
}
