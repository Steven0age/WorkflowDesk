import { supabase } from "../supabase-client";

type UploadAnswerFileParams = {
  file: File;
  ticketId: string;
  ticketAnswerId: string;
  uploadedBy: string;
};

export const uploadAnswerFile = async ({
  file,
  ticketId,
  ticketAnswerId,
  uploadedBy,
}: UploadAnswerFileParams) => {
  const filePath = `uploads/${Date.now()}_${file.name}`;

  const { error: storageError } = await supabase.storage
    .from("uploads")
    .upload(filePath, file);

  if (storageError) {
    console.error("Uploading file to storage failed:", storageError);
    throw storageError;
  }

  const { error: uploadRowError } = await supabase.from("uploads").insert({
    ticket_id: ticketId,
    ticket_answer_id: ticketAnswerId,
    ticket_phase_id: null,
    file_path: filePath,
    file_name: file.name,
    uploaded_by: uploadedBy,
    file_size: file.size,
  });

  if (uploadRowError) {
    console.error("Creating upload row failed:", uploadRowError);
    throw uploadRowError;
  }
};
