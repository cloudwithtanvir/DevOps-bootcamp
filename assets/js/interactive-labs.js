document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-quiz]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const questions = [...form.querySelectorAll("[data-question]")];
      let score = 0;
      questions.forEach((question) => {
        const selected = question.querySelector("input:checked");
        const feedback = question.querySelector(".quiz-feedback");
        const correct = selected && selected.value === question.dataset.answer;
        feedback.textContent = !selected ? "Choose an answer to complete this question." : correct ? "Correct — nice work." : "Not quite. Review the lesson notes and try again.";
        feedback.classList.toggle("correct", Boolean(correct));
        if (correct) score += 1;
      });
      form.querySelector("[data-quiz-result]").textContent = `Your score: ${score}/${questions.length}`;
    });
    form.addEventListener("reset", () => {
      form.querySelectorAll(".quiz-feedback").forEach((node) => { node.textContent = ""; node.classList.remove("correct"); });
      form.querySelector("[data-quiz-result]").textContent = "";
    });
  });

  document.querySelectorAll("[data-lab-checklist]").forEach((lab) => {
    const boxes = [...lab.querySelectorAll('input[type="checkbox"]')];
    const bar = lab.querySelector("[data-lab-progress]");
    const count = lab.querySelector("[data-lab-count]");
    const update = () => {
      const done = boxes.filter((box) => box.checked).length;
      bar.style.width = `${boxes.length ? (done / boxes.length) * 100 : 0}%`;
      count.textContent = `${done} of ${boxes.length} steps completed`;
    };
    boxes.forEach((box) => box.addEventListener("change", update));
    update();
  });
});
