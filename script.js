// Sample data for textbooks and solutions
const textbookData = {
    8:  [
         { name: "Science", textbook: "textbooks/class8/science-textbook.pdf", solutions: "textbooks/class8/science-solutions.pdf" },
        { name: "Mathematics", textbook: "textbooks/class8/maths-textbook.pdf", solutions: "textbooks/class8/maths-solutions.pdf" },
        { name: "English", textbook: "textbooks/class8/english-textbook.pdf", solutions: "textbooks/class8/english-solutions.pdf" },
        { name: "Marathi", textbook: "textbooks/class8/marathi-textbook.pdf", solutions: "textbooks/class8/marathi-solutions.pdf" },
        { name: "Hindi", textbook: "textbooks/class8/hindi-textbook.pdf", solutions: "textbooks/class8/hindi-solutions.pdf" },
        { name: "History", textbook: "textbooks/class8/history-textbook.pdf", solutions: "textbooks/class8/history-solutions.pdf" },
        { name: "Geography", textbook: "textbooks/class8/geography-textbook.pdf", solutions: "textbooks/class8/geography-solutions.pdf" }
    ],
    9:  [
         { name: "Science", textbook: "textbooks/class9/science-textbook.pdf", solutions: "textbooks/class9/science-solutions.pdf" },
        { name: "Algebra", textbook: "textbooks/class9/algebra-textbook.pdf", solutions: "textbooks/class9/algebra-solutions.pdf" },
        { name: "Geometry", textbook: "textbooks/class9/geometry-textbook.pdf", solutions: "textbooks/class9/geometry-solutions.pdf" },
        { name: "English", textbook: "textbooks/class9/english-textbook.pdf", solutions: "textbooks/class9/english-solutions.pdf" },
        { name: "Marathi", textbook: "textbooks/class9/marathi-textbook.pdf", solutions: "textbooks/class9/marathi-solutions.pdf" },
        { name: "Hindi", textbook: "textbooks/class9/hindi-textbook.pdf", solutions: "textbooks/class9/hindi-solutions.pdf" },
        { name: "History", textbook: "textbooks/class9/history-textbook.pdf", solutions: "textbooks/class9/history-solutions.pdf" },
        { name: "Geography", textbook: "textbooks/class9/geography-textbook.pdf", solutions: "textbooks/class9/geography-solutions.pdf" }
    ],
    10: [
         { name: "Science1", textbook: "textbooks/class10/science1-textbook.pdf", solutions: "textbooks/class10/science1-solutions.pdf" },
        { name: "Science2", textbook: "textbooks/class10/science2-textbook.pdf", solutions: "textbooks/class10/science2-solutions.pdf" },
        { name: "Mathematics1", textbook: "textbooks/class10/maths1-textbook.pdf", solutions: "textbooks/class10/maths1-solutions.pdf" },
        { name: "Mathematics2", textbook: "textbooks/class10/maths2-textbook.pdf", solutions: "textbooks/class10/maths2-solutions.pdf" },
        { name: "English", textbook: "textbooks/class10/english-textbook.pdf", solutions: "textbooks/class10/english-solutions.pdf" },
        { name: "Marathi", textbook: "textbooks/class10/marathi-textbook.pdf", solutions: "textbooks/class10/marathi-solutions.pdf" },
        { name: "Hindi", textbook: "textbooks/class10/hindi-textbook.pdf", solutions: "textbooks/class10/hindi-solutions.pdf" },
        { name: "History", textbook: "textbooks/class10/history-textbook.pdf", solutions: "textbooks/class10/history-solutions.pdf" },
        { name: "Geography", textbook: "textbooks/class10/geography-textbook.pdf", solutions: "textbooks/class10/geography-solutions.pdf" }
    ],
    11: [
         { name: "Bookkeeping And Accountancy", textbook: "textbooks/class11/bk-textbook.pdf",                      solutions: "textbooks/class11/bk-solutions.pdf" },
        { name: "Economics", textbook: "textbooks/class11/eco-textbook.pdf",                                        solutions: "textbooks/class11/eco-solutions.pdf" },
        { name: "Organization of Commerce N Management", textbook: "textbooks/class11/oc-textbook.pdf",             solutions: "textbooks/class11/oc-solutions.pdf" },
        { name: "Secretarial Practice", textbook: "textbooks/class11/sp-textbook.pdf",                              solutions: "textbooks/class11/sp-solutions.pdf" },
        { name: "Maths And Statistics 1", textbook: "textbooks/class11/maths1-textbook.pdf",                        solutions: "textbooks/class11/maths1-solutions.pdf" },
        { name: "Maths And Statistics 2", textbook: "textbooks/class11/maths2-textbook.pdf",                        solutions: "textbooks/class11/maths2-solutions.pdf" }
    ],
    12: [
         { name: "Bookkeeping And Accountancy", textbook: "textbooks/class12/bk-textbook.pdf",                      solutions: "textbooks/class12/bk-solutions.pdf" },
        { name: "Economics", textbook: "textbooks/class12/eco-textbook.pdf",                                        solutions: "textbooks/class12/eco-solutions.pdf" },
        { name: "Organization of Commerce N Management", textbook: "textbooks/class12/oc-textbook.pdf",             solutions: "textbooks/class12/oc-solutions.pdf" },
        { name: "Secretarial Practice", textbook: "textbooks/class12/sp-textbook.pdf",                              solutions: "textbooks/class12/sp-solutions.pdf" },
        { name: "Maths And Statistics 1", textbook: "textbooks/class12/maths1-textbook.pdf",                        solutions: "textbooks/class12/maths1-solutions.pdf" },
        { name: "Maths And Statistics 2", textbook: "textbooks/class12/maths2-textbook.pdf",                        solutions: "textbooks/class12/maths2-solutions.pdf" }
    ]
};

// DOM elements
const classSelect = document.getElementById('class-select');
const subjectList = document.getElementById('subject-list');
const pdfViewer = document.getElementById('pdf-viewer');
const pdfFrame = document.getElementById('pdf-frame');
const pdfTitle = document.getElementById('pdf-title');
const closePdfBtn = document.getElementById('close-pdf');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');

// Check online status and update UI
function updateOnlineStatus() {
    if (navigator.onLine) {
        statusIndicator.style.backgroundColor = '#28a745';
        statusText.textContent = 'Online - Content will be cached for offline use';
    } else {
        statusIndicator.style.backgroundColor = '#dc3545';
        statusText.textContent = 'Offline - Using cached content';
    }
}

// Initialize the app
function init() {
    // Set up event listeners
    classSelect.addEventListener('change', loadSubjects);
    closePdfBtn.addEventListener('click', () => {
        pdfViewer.style.display = 'none';
    });
    
    // Check online status
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
    
    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
}

// Load subjects for selected class
function loadSubjects() {
    const selectedClass = classSelect.value;
    
    if (!selectedClass) {
        subjectList.innerHTML = '<p class="placeholder">Please select a class to view available textbooks and solutions</p>';
        return;
    }
    
    const subjects = textbookData[selectedClass];
    
    if (!subjects || subjects.length === 0) {
        subjectList.innerHTML = '<p class="placeholder">No textbooks available for this class yet</p>';
        return;
    }
    
    let html = '';
    subjects.forEach(subject => {
        html += `
            <div class="subject-card">
                <h3>${subject.name}</h3>
                <div class="pdf-buttons">
                    <button class="btn btn-primary" onclick="openPdf('${subject.textbook}', '${subject.name} Textbook - Class ${selectedClass}')">
                        Open Textbook
                    </button>
                    <button class="btn btn-secondary" onclick="openPdf('${subject.solutions}', '${subject.name} Solutions - Class ${selectedClass}')">
                        Open Solutions
                    </button>
                </div>
            </div>
        `;
    });
    
    subjectList.innerHTML = html;
}

// Open PDF in viewer
function openPdf(pdfPath, title) {
    pdfTitle.textContent = title;
    pdfFrame.src = pdfPath;
    pdfViewer.style.display = 'flex';
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);