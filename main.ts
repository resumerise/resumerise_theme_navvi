import * as eta from "https://deno.land/x/eta@v1.6.0/mod.ts";
import {
  CompileException,
  getAddItemTemplatePath,
  getNavTemplatePath,
  getWidgetCSSFilePath,
  ResumeriseMeta,
} from "resumerise_library/mod.ts";
import { Resume } from "../resumerise_library/codegen/model/resume.ts";
import { format } from "https://deno.land/std@0.102.0/datetime/mod.ts";
import { Settings } from "../resumerise_library/codegen/model/settings.ts";

function formatDate(timestamp: string, settings: Settings) {
  try {
    return format(new Date(timestamp), settings?.dateFormat!);
  } catch (e) {
    console.log(`Date could not be formatted ${e}`);
  }
}

export const render = async (
  resume: Resume,
  type: string,
): Promise<string> => {
  try {
    console.log(
      "TEST " + new URL("./templates/layout.eta", import.meta.url).pathname,
    );
    const layout = Deno.readTextFileSync(
      new URL("./templates/layout.eta", import.meta.url).pathname,
    );
    const css = Deno.readTextFileSync(
      new URL("./css/style.css", import.meta.url).pathname,
    );

    const awardTemplateName = "awards";
    eta.templates.define(
      awardTemplateName,
      eta.loadFile(
        new URL("./templates/categories/awards.eta", import.meta.url).pathname,
        {} as any,
        true,
      ),
    );

    const basicTemplateName = "basic";
    eta.templates.define(
      basicTemplateName,
      eta.loadFile(
        new URL("./templates/categories/basics.eta", import.meta.url).pathname,
        {} as any,
        true,
      ),
    );

    const profileTemplateName = "profile";
    eta.templates.define(
      profileTemplateName,
      eta.loadFile(
        new URL("./templates/categories/profiles.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const educationTemplateName = "education";
    eta.templates.define(
      educationTemplateName,
      eta.loadFile(
        new URL("./templates/categories/education.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const interestTemplateName = "interest";
    eta.templates.define(
      interestTemplateName,
      eta.loadFile(
        new URL("./templates/categories/interests.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const languageTemplateName = "language";
    eta.templates.define(
      languageTemplateName,
      eta.loadFile(
        new URL("./templates/categories/languages.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const publicationTemplateName = "publication";
    eta.templates.define(
      publicationTemplateName,
      eta.loadFile(
        new URL("./templates/categories/publications.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const referenceTemplateName = "reference";
    eta.templates.define(
      referenceTemplateName,
      eta.loadFile(
        new URL("./templates/categories/references.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const skillsTemplateName = "skills";
    eta.templates.define(
      skillsTemplateName,
      eta.loadFile(
        new URL("./templates/categories/skills.eta", import.meta.url).pathname,
        {} as any,
        true,
      ),
    );

    const volunteerTemplateName = "volunteer";
    eta.templates.define(
      volunteerTemplateName,
      eta.loadFile(
        new URL("./templates/categories/volunteer.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const workTemplateName = "work";
    eta.templates.define(
      workTemplateName,
      eta.loadFile(
        new URL("./templates/categories/work.eta", import.meta.url).pathname,
        {} as any,
        true,
      ),
    );

    const projectTemplateName = "project";
    eta.templates.define(
      projectTemplateName,
      eta.loadFile(
        new URL("./templates/categories/projects.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const certificateTemplateName = "certification";
    eta.templates.define(
      certificateTemplateName,
      eta.loadFile(
        new URL("./templates/categories/certifications.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const dateRangeTemplateName = "date-range";
    eta.templates.define(
      dateRangeTemplateName,
      eta.loadFile(
        new URL("./templates/widgets/date-range.eta", import.meta.url).pathname,
        {} as any,
        true,
      ),
    );

    const keyValueTemplateName = "key-value-item";
    eta.templates.define(
      keyValueTemplateName,
      eta.loadFile(
        new URL("./templates/widgets/key-value-item.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const listTemplateName = "list";
    eta.templates.define(
      listTemplateName,
      eta.loadFile(
        new URL("./templates/widgets/list.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const locationTemplateName = "location";
    eta.templates.define(
      locationTemplateName,
      eta.loadFile(
        new URL("./templates/categories/location.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    const profilePictureTemplateName = "profile-picture";
    eta.templates.define(
      profilePictureTemplateName,
      eta.loadFile(
        new URL("./templates/categories/profile-picture.eta", import.meta.url)
          .pathname,
        {} as any,
        true,
      ),
    );

    /** ! DO NOT REMOVE ! ------------ begin */
    const widgetCss = getWidgetCSSFilePath();

    const navTemplateName = "nav";
    eta.templates.define(
      navTemplateName,
      eta.compile(
        getNavTemplatePath(),
      ),
    );

    const addTemplateName = "add";
    eta.templates.define(
      addTemplateName,
      eta.compile(
        getAddItemTemplatePath(),
      ),
    );
    /** ! DO NOT REMOVE ! ------------ end */

    const map = new Map<string, string>();
    map.set("AWARDS", awardTemplateName);
    map.set("BASICS", basicTemplateName);
    map.set("PROFILE", profileTemplateName);
    map.set("PROJECT", projectTemplateName);
    map.set("EDUCATION", educationTemplateName);
    map.set("CERTIFICATE", certificateTemplateName);
    map.set("INTEREST", interestTemplateName);
    map.set("LANGUAGE", languageTemplateName);
    map.set("PUBLICATION", publicationTemplateName);
    map.set("REFERENCE", referenceTemplateName);
    map.set("SKILL", skillsTemplateName);
    map.set("LOCATION", locationTemplateName);
    map.set("VOLUNTEER", volunteerTemplateName);
    map.set("WORK", workTemplateName);

    const orderedMap = new Map<string, string>();
    resume.settings?.visibleCategories?.forEach((resumeCategory) => {
      orderedMap.set(resumeCategory, map.get(resumeCategory)!);
    });
    const result = await eta.render(layout, {
      css: css,
      widgetCss: widgetCss,
      formatDate: formatDate,
      resume: resume,
      type: type,
      templates: Array.from(orderedMap.values()).filter((item) => !!item),
    }) as string;
    return result;
  } catch (e) {
    console.log(`Error while compiling resume: ${e}`);
    throw new CompileException(e);
  }
};

export const getMeta = (): ResumeriseMeta => {
  return JSON.parse(
    Deno.readTextFileSync(
      new URL("./meta.json", import.meta.url)
        .pathname,
    ),
  ) as ResumeriseMeta;
};
