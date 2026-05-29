document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    
    // 1. OAUTH REDIRECT SIMULATION
    // If the URL has a '?code=' parameter, it means TikTok just redirected back to us.
    if (urlParams.has('code')) {
        loginView.style.display = 'none';
        dashboardView.style.display = 'block';
        
        // Clean up the URL so it looks nice in the address bar (optional, but good for video)
        window.history.replaceState({}, document.title, "/privatehtml/dashboard.html");
    } else {
        // Not logged in yet
        loginView.style.display = 'block';
        dashboardView.style.display = 'none';
    }

    // 2. UPLOAD SIMULATION
    const uploadForm = document.getElementById('upload-form');
    const uploadBtn = document.getElementById('upload-btn');
    const uploadStatus = document.getElementById('upload-status');
    const statusText = document.getElementById('status-text');

    if (uploadForm) {
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission
            
            // Show uploading state
            uploadBtn.style.display = 'none';
            uploadStatus.style.display = 'block';
            statusText.innerHTML = 'Uploading chunk 1/1... <span class="spinner"></span>';
            
            // Simulate network delay
            setTimeout(() => {
                statusText.innerHTML = 'Processing on TikTok Servers... <span class="spinner"></span>';
                
                setTimeout(() => {
                    statusText.innerHTML = '✅ Video successfully published to TikTok via API!';
                    statusText.style.color = '#00ff00';
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        uploadForm.reset();
                        uploadBtn.style.display = 'block';
                        uploadStatus.style.display = 'none';
                        statusText.innerHTML = 'Uploading... <span class="spinner"></span>';
                        statusText.style.color = 'var(--accent-cyan)';
                        
                        // Add a dummy row to the table to make it look like it updated
                        const tbody = document.querySelector('.video-table tbody');
                        const newRow = document.createElement('tr');
                        newRow.innerHTML = `
                            <td><div class="mock-thumb"></div></td>
                            <td>Just Uploaded Video</td>
                            <td><span class="badge success">Published</span></td>
                            <td>Just now</td>
                        `;
                        tbody.insertBefore(newRow, tbody.firstChild);
                        
                    }, 3000);
                }, 2000);
            }, 1500);
        });
    }
});
