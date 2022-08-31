const scrollToSection = (id) => {
  const section = id ? document.getElementById(id) : null;
  const headerOffset = 60;

  if (section) {
    const offsetPosition = section.offsetTop - headerOffset;

    window.scrollTo({
      top: offsetPosition,
    });
  }

  window.history.replaceState(
    {
      id,
    },
    '',
    `/api/${id}/`
  );
};

export default scrollToSection;
