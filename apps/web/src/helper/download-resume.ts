export const downloadResume = async (resume: string) => {
  return await fetch(resume, { method: 'GET' }).then((response) =>
    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const defaultName = resume.split('/').pop() || 'resume';
      const a = document.createElement('a');
      a.href = url;
      a.download = defaultName;
      a.click();
      window.URL.revokeObjectURL(url);
    }),
  );
};
