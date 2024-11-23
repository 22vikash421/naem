let navbar = document.querySelector('.header .flex .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active')
}

document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
    inputNumber.oninput = () =>{
        if(inputNumber.value.length > inputNumber.maxLenght) inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLenght);

    };
});





document.getElementById('job-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        company: {
            name: document.getElementById('company-name').value,
            posted: document.getElementById('company-posted').value,
            logo: document.getElementById('company-logo').value
        },
        details: {
            title: document.getElementById('job-title').value,
            location: {
                city: document.getElementById('job-location-city').value,
                country: document.getElementById('job-location-country').value
            },
            tags: {
                salary: document.getElementById('salary').value,
                employmentType: document.getElementById('employment-type').value,
                shift: document.getElementById('shift').value
            }
        },
        actions: {
            viewDetailsLink: document.getElementById('view-details-link').value,
            favorite: false
        }
    };

    console.log(formData); // Log the form data to the console for debugging

    const response = await fetch('https://script.google.com/macros/s/AKfycbweQJNkQMAksSTNF0V-S4NQV5tcEd4yy5VX9wt8L5Zd-UFSXtLYEKnGdDuJ45gaDczY/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Ensure this is a JSON string
    });
    

    const result = await response.text();
    alert(result); // Show success message
});





// THIS IS THE JOB SERACH INPUT JS CODE START
document.getElementById('job-search-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Get user input
    const title = document.getElementById('title').value;
    const location = document.getElementById('location').value;

    // API URL - Replace with your actual API URL
    const apiUrl = `https://api.smartrecruiters.com/feed/publications?updatedAfter=2015-10-02T00:01:08.000Z`;

    // Fetch job data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if jobs were found
            if (data.jobs && data.jobs.length > 0) {
                let jobResultsHtml = '<ul>';

                // Loop through the jobs and create HTML for each job
                data.jobs.forEach(job => {
                    jobResultsHtml += `
                        <li>
                            <h4>${job.title}</h4>
                            <p><strong>Company:</strong> ${job.company}</p>
                            <p><strong>Location:</strong> ${job.location}</p>
                            <p><strong>Salary:</strong> ${job.salary}</p>
                            <a href="${job.applyUrl}" target="_blank">Apply Here</a>
                        </li>
                    `;
                });

                jobResultsHtml += '</ul>';

                // Display the job results in the popup
                document.getElementById('job-results').innerHTML = jobResultsHtml;

                // Show the popup
                document.getElementById('job-popup').style.display = 'flex';
            } else {
                document.getElementById('job-results').innerHTML = '<p>No jobs found for your search.</p>';
                document.getElementById('job-popup').style.display = 'flex';
            }
        })
        .catch(error => {
            console.error('Error fetching job data:', error);
            document.getElementById('job-results').innerHTML = '<p>Error fetching job data. Please try again later.</p>';
            document.getElementById('job-popup').style.display = 'flex';
        });
});

// Close popup when the user clicks the close button
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('job-popup').style.display = 'none';
});
