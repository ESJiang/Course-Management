document.addEventListener("DOMContentLoaded", () => {
    const addCourseForm = document.getElementById("add-course-form");
    const courseList = document.getElementById("course-list");
    const errorContainer = document.getElementById("error-container");
    const fetchCourse = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/courses");
            const courses = await response.json();
            console.log("courses", courses);
            courseList.innerHTML = "";
            courses.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `Title: ${item.title}, Description: ${item.description}, Instructor: ${item.instructor}, Duration: ${item.duration}`;
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add("delete-button");
                deleteBtn.dataset.courseID = item._id;
                li.appendChild(deleteBtn);
                courseList.appendChild(li);
                deleteBtn.addEventListener("click", async function () {
                    const courseID = this.dataset.courseID;
                    console.log(courseID);
                    if (confirm(`Are you sure you want to delete ${this.parentNode.textContent.match(/Title: (.*?),/)[1]}?`)) {
                        try {
                            const response = await fetch(`http://localhost:8000/api/courses/${courseID}`, {
                                method: "DELETE",
                            });
                            if (response.ok) fetchCourse();
                            else console.error("Error deleting");
                        } catch (error) {
                            console.error("network error");
                        }
                    }
                });
            });
        } catch (error) {
            console.table(error);
        }
    };
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(addCourseForm);
        const courseData = Object.fromEntries(formData.entries());
        console.log("courseData", courseData);
        try {
            const response = await fetch("http://localhost:8000/api/courses", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(courseData),
            });
            if (response.ok) {
                addCourseForm.reset();
                fetchCourse();
            }
            const responseData = await response.json();
            if (responseData.errors) {
                errorContainer.innerHTML = "";
                for (const field in responseData.errors) {
                    const errorText = responseData.errors[field];
                    const errorElement = document.createElement("p");
                    errorElement.textContent = errorText;
                    errorContainer.appendChild(errorElement);
                }
            }
        } catch (error) {
            console.table(error);
        }
    }
    addCourseForm.addEventListener("submit", handleSubmit);
    fetchCourse();
});
