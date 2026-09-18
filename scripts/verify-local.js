const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const mainJs = fs.readFileSync(path.join(root, "main.js"), "utf8");
const submitJs = fs.readFileSync(path.join(root, "api", "submit.js"), "utf8");
const sql = fs.readFileSync(
  path.join(root, "sql", "006_enrollment_submissions_trabajo.sql"),
  "utf8",
);
const formConfig = fs.readFileSync(path.join(root, "form-config.js"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");

assert.ok(indexHtml.includes("Taller de factores críticos - Dimensión Trabajo"));
assert.ok(indexHtml.includes("29 de septiembre de 2026"));
assert.ok(indexHtml.includes("9:00 hs."));
assert.ok(indexHtml.includes("Facultad de Ciencias Sociales"));
assert.ok(!indexHtml.includes('id="profession"'));
assert.ok(indexHtml.includes('id="workplace"'));
assert.ok(!indexHtml.includes('id="organization"'));
assert.ok(!indexHtml.includes('id="residenceDepartment"'));
assert.ok(!indexHtml.includes("Departamento de residencia"));
assert.ok(!indexHtml.includes("academic-units.js"));
assert.ok(!indexHtml.includes("researcherClassification"));

assert.ok(mainJs.includes("workplace"));
assert.ok(!mainJs.includes("profession"));
assert.ok(mainJs.includes('["Masculino", "Femenino", "No binario", "Otro"]'));
assert.ok(!mainJs.includes("RESIDENCE_DEPARTMENT_VALUES"));
assert.ok(!mainJs.includes("organization"));
assert.ok(!mainJs.includes("residenceDepartment"));
assert.ok(!mainJs.includes("RESEARCHER_CLASSIFICATION_VALUES"));
assert.ok(!mainJs.includes("loadAcademicUnits"));

assert.ok(submitJs.includes("enrollment_submissions_trabajo"));
assert.ok(!submitJs.includes("profession"));
assert.ok(submitJs.includes("workplace"));
assert.ok(submitJs.includes('["Masculino", "Femenino", "No binario", "Otro"]'));
assert.ok(!submitJs.includes("enrollment_submissions_extension"));
assert.ok(!submitJs.includes("organization"));
assert.ok(!submitJs.includes("residence_department"));
assert.ok(!submitJs.includes("RESIDENCE_DEPARTMENT_VALUES"));
assert.ok(!submitJs.includes("enrollment_submissions_iyc"));
assert.ok(!submitJs.includes("getAcademicUnits"));

assert.ok(sql.includes("public.enrollment_submissions_trabajo"));
assert.ok(!sql.includes("profession"));
assert.ok(sql.includes("workplace text not null"));
assert.ok(sql.includes("enrollment_submissions_trabajo_dni_key unique"));
assert.ok(sql.includes("enrollment_submissions_trabajo_created_at_idx"));

assert.ok(formConfig.includes('startsAt: "2026-09-19T00:00:00-03:00"'));
assert.ok(formConfig.includes('expiresAt: "2026-09-28T23:59:59-03:00"'));
assert.ok(formConfig.includes("19 de septiembre de 2026"));
assert.ok(formConfig.includes("28 de septiembre de 2026"));

assert.match(readme, /Dimensión Trabajo/i);
assert.match(readme, /enrollment_submissions_trabajo/i);
assert.doesNotMatch(readme, /Profesión/i);
assert.match(readme, /Lugar de trabajo/i);

console.log("Local verification passed.");
