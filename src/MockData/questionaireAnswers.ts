export type QuestionnaireAnswerMockDataTypes = {
  id: string;
  ticket_id: number;
  questionnaire_snapshot_id: string;
  question_label: string;
  field_type: "textField" | "upload";
  text_answer: string | null;
};

export const questionnaireAnswers: QuestionnaireAnswerMockDataTypes[] = [
  {
    id: "a1c1c1c1-0001-4c2d-9f11-111111111111",
    ticket_id: 1,
    questionnaire_snapshot_id: "qTemp-1-1",
    question_label: "Firmenname",
    field_type: "textField",
    text_answer: "Muster GmbH",
  },
  {
    id: "a1c1c1c1-0002-4c2d-9f11-111111111112",
    ticket_id: 1,
    questionnaire_snapshot_id: "qTemp-1-2",
    question_label: "Ansprechpartner (Name, E-Mail, Telefon)",
    field_type: "textField",
    text_answer: "Lisa Berger, lisa.berger@muster-gmbh.de, +49 151 23456789",
  },
  {
    id: "a1c1c1c1-0003-4c2d-9f11-111111111113",
    ticket_id: 1,
    questionnaire_snapshot_id: "qTemp-1-3",
    question_label: "Zugangsdaten/Setup-Dokumente hochladen",
    field_type: "upload",
    text_answer: null,
  },
  {
    id: "a1c1c1c1-0005-4c2d-9f11-111111111115",
    ticket_id: 1,
    questionnaire_snapshot_id: "qTemp-1-4",
    question_label: "Besondere Hinweise für den Mitarbeiter",
    field_type: "textField",
    text_answer:
      "Bitte Onboarding-Call innerhalb von 48h terminieren. Vertrag liegt im Upload.",
  },

  {
    id: "b2d2d2d2-0001-4a2b-8c22-222222222221",
    ticket_id: 2,
    questionnaire_snapshot_id: "qTemp-2-1",
    question_label: "Welcher Dienstwagen?",
    field_type: "textField",
    text_answer: "VW Transporter, Kennzeichen B-AB 1234",
  },
  {
    id: "b2d2d2d2-0002-4a2b-8c22-222222222222",
    ticket_id: 2,
    questionnaire_snapshot_id: "qTemp-2-2",
    question_label: "Standort / Abholort",
    field_type: "textField",
    text_answer: "Parkplatz Hinterhof, Stellplatz 7",
  },
  {
    id: "b2d2d2d2-0003-4a2b-8c22-222222222223",
    ticket_id: 2,
    questionnaire_snapshot_id: "qTemp-2-3",
    question_label: "Fotos vom aktuellen Zustand (optional)",
    field_type: "upload",
    text_answer: null,
  },
  {
    id: "b2d2d2d2-0005-4a2b-8c22-222222222225",
    ticket_id: 2,
    questionnaire_snapshot_id: "qTemp-2-4",
    question_label: "Besondere Hinweise",
    field_type: "textField",
    text_answer:
      "Innenraum: Hundehaare entfernen. Außen: Insekten an Frontscheibe.",
  },
  {
    id: "b2e2e2e2-0001-4a2b-8c22-333333333331",
    ticket_id: 2,
    questionnaire_snapshot_id: "qTemp-2-5",
    question_label: "Zusatzwunsch (optional)",
    field_type: "textField",
    text_answer: "",
  },
];
