// Initialize AOS animations
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Mapbox Initialization
mapboxgl.accessToken = 'pk.eyJ1IjoiYm9oZW5peCIsImEiOiJjbHVtZ2V1eG4wMGJpMmpvNnF1b2Z5d2FzIn0.1234567890'; // Replace with your actual token
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [36.8219, -1.2921], // Nairobi, Kenya
  zoom: 12,
  pitch: 45,
  bearing: -17.6
});

// Add 3D buildings and terrain
map.on('load', () => {
  // Add terrain source
  map.addSource('mapbox-dem', {
    type: 'raster-dem',
    url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
    tileSize: 512,
    maxzoom: 14
  });
  
  map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
  
  // Add sky layer
  map.addLayer({
    'id': 'sky',
    'type': 'sky',
    'paint': {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 0.0],
      'sky-atmosphere-sun-intensity': 15
    }
  });
  
  // Add markers for charging stations
  const chargingStations = [
    { 
      name: 'Nairobi West Station', 
      status: 'Available', 
      coordinates: [36.8119, -1.3021],
      address: 'Mombasa Road, Nairobi'
    },
    { 
      name: 'Kilimani Hub', 
      status: 'Occupied', 
      coordinates: [36.7919, -1.2821],
      address: 'Argwings Kodhek Rd'
    },
    { 
      name: 'Thika Road Station', 
      status: 'Available', 
      coordinates: [36.8519, -1.2721],
      address: 'Thika Super Highway'
    }
  ];

  chargingStations.forEach(station => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.innerHTML = `<i class="fas fa-charging-station ${station.status === 'Available' ? 'available' : 'occupied'}"></i>`;
    
    new mapboxgl.Marker(el)
      .setLngLat(station.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <h3>${station.name}</h3>
          <p>${station.address}</p>
          <p>Status: <strong>${station.status}</strong></p>
          <button class="popup-btn">Navigate</button>
        `))
      .addTo(map);
  });
  
  // Add vehicle markers
  const vehicles = [
    { id: 'VH-001', coordinates: [36.8219, -1.2921], status: 'moving', speed: '45 km/h' },
    { id: 'VH-002', coordinates: [36.8319, -1.2821], status: 'idle', speed: '0 km/h' },
    { id: 'VH-003', coordinates: [36.8019, -1.2721], status: 'moving', speed: '60 km/h' }
  ];
  
  vehicles.forEach(vehicle => {
    const el = document.createElement('div');
    el.className = 'marker vehicle';
    el.innerHTML = `<i class="fas fa-car ${vehicle.status}"></i>`;
    
    new mapboxgl.Marker(el)
      .setLngLat(vehicle.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <h3>Vehicle ${vehicle.id}</h3>
          <p>Status: <strong>${vehicle.status}</strong></p>
          <p>Speed: <strong>${vehicle.speed}</strong></p>
          <button class="popup-btn">Track Vehicle</button>
        `))
      .addTo(map);
  });
});

// Traffic Data
const trafficData = {
  daily: {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'],
    datasets: [
      {
        label: 'Thika Road',
        data: [65, 85, 84, 72, 95, 60, 40],
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Mombasa Road',
        data: [30, 45, 60, 50, 70, 40, 30],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Waiyaki Way',
        data: [50, 70, 75, 60, 80, 50, 35],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  },
  monthly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Thika Road',
        data: [72, 85, 78, 90],
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Mombasa Road',
        data: [45, 60, 55, 65],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Waiyaki Way',
        data: [65, 75, 70, 80],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  },
  annual: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Thika Road',
        data: [75, 82, 78, 85],
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Mombasa Road',
        data: [50, 65, 60, 70],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Waiyaki Way',
        data: [70, 75, 72, 78],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }
};

// Initialize Traffic Chart
const trafficCtx = document.getElementById('trafficChart').getContext('2d');
let trafficChart = new Chart(trafficCtx, {
  type: 'line',
  data: trafficData.daily,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#F8FAFC'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#F8FAFC'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#F8FAFC'
        }
      }
    }
  }
});

// Subscription Button Functionality
const subscriptionBtns = document.querySelectorAll('.subscription-btn');
subscriptionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    subscriptionBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Get the period from data attribute
    const period = btn.dataset.period;
    
    // Update chart data
    trafficChart.data = trafficData[period];
    trafficChart.update();
  });
});

// Update traffic data randomly every 10 seconds
setInterval(() => {
  trafficChart.data.datasets.forEach(dataset => {
    dataset.data = dataset.data.map(value => {
      const change = Math.floor(Math.random() * 20) - 10; // Random change between -10 and 10
      return Math.max(10, Math.min(100, value + change)); // Keep between 10 and 100
    });
  });
  trafficChart.update();
}, 10000);

// Map controls
document.getElementById('zoom-in').addEventListener('click', () => {
  map.zoomIn();
});

document.getElementById('zoom-out').addEventListener('click', () => {
  map.zoomOut();
});

document.getElementById('locate-me').addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(position => {
    map.flyTo({
      center: [position.coords.longitude, position.coords.latitude],
      zoom: 14
    });
    
    new mapboxgl.Marker()
      .setLngLat([position.coords.longitude, position.coords.latitude])
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'))
      .addTo(map);
  }, error => {
    Toastify({
      text: 'Unable to get your location: ' + error.message,
      duration: 3000,
      backgroundColor: '#EF4444'
    }).showToast();
  });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  
  // Update icon
  themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  
  Toastify({
    text: `Switched to ${isDark ? 'light' : 'dark'} mode`,
    duration: 3000,
    backgroundColor: '#7C3AED'
  }).showToast();
});

// SOS Button
document.getElementById('sos-button').addEventListener('click', () => {
  // Get current location
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    
    // Show emergency alert
    Toastify({
      text: 'SOS Alert Sent! Emergency services notified of your location.',
      duration: 5000,
      backgroundColor: '#EF4444',
      gravity: 'top',
      position: 'center'
    }).showToast();
    
    // In a real app, this would send to your backend
    console.log('SOS sent with location:', { latitude, longitude });
    
    // Add emergency marker to map
    new mapboxgl.Marker({ color: '#EF4444' })
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Emergency Location</h3>'))
      .addTo(map);
      
    // Flash the marker
    const markerElement = document.querySelector('.mapboxgl-marker:last-child');
    if (markerElement) {
      markerElement.style.animation = 'pulse 1s infinite';
    }
  }, error => {
    Toastify({
      text: 'Error getting location for SOS: ' + error.message,
      duration: 3000,
      backgroundColor: '#EF4444'
    }).showToast();
  });
});

// Chat Functionality
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

function addMessage(content, sender = 'You', time = new Date()) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message';
  
  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messageDiv.innerHTML = `
    <div class="chat-avatar">${sender.charAt(0).toUpperCase()}</div>
    <div class="message-content">
      <div>${sender}: ${content}</div>
      <div class="message-time">${timeString}</div>
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    addMessage(message);
    chatInput.value = '';
    
    // Simulate response after 1-3 seconds
    setTimeout(() => {
      const responses = [
        "Message received. Taking action now.",
        "Thanks for the update.",
        "Copy that.",
        "Understood. Will advise the team.",
        "Received. Please provide more details when possible."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, 'Fleet Manager');
    }, 1000 + Math.random() * 2000);
  }
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    chatSend.click();
  }
});

// Notifications Panel
const notificationsBtn = document.getElementById('notifications-btn');
const notificationsPanel = document.getElementById('notifications-panel');

notificationsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  notificationsPanel.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!notificationsPanel.contains(e.target)) {
    notificationsPanel.classList.remove('open');
  }
});

// Clear notifications
document.querySelector('.notification-clear').addEventListener('click', () => {
  document.querySelector('.notification-list').innerHTML = '<li class="notification-item empty">No notifications</li>';
  document.querySelector('.notification-badge').style.display = 'none';
});

// Profile Panel
const profileBtn = document.getElementById('profile-btn');
const profilePanel = document.getElementById('profile-panel');
const profileClose = document.getElementById('profile-close');

profileBtn.addEventListener('click', () => {
  profilePanel.classList.add('open');
});

profileClose.addEventListener('click', () => {
  profilePanel.classList.remove('open');
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  Toastify({
    text: 'Message sent successfully! We will contact you soon.',
    duration: 5000,
    backgroundColor: '#10B981',
    gravity: 'top'
  }).showToast();
  
  // Reset form
  e.target.reset();
});

// Simulate real-time updates
setInterval(() => {
  // Update charging station status randomly
  const statuses = ['Available', 'Occupied', 'Maintenance'];
  const stations = document.querySelectorAll('.station-status');
  
  stations.forEach(station => {
    if (Math.random() > 0.7) { // 30% chance to change status
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      station.className = 'station-status';
      
      if (newStatus === 'Available') {
        station.classList.add('status-available');
      } else if (newStatus === 'Occupied') {
        station.classList.add('status-occupied');
      } else {
        station.classList.add('status-maintenance');
      }
      
      // Show notification if status changed to available
      if (newStatus === 'Available') {
        Toastify({
          text: 'A charging station is now available',
          duration: 3000,
          backgroundColor: '#10B981'
        }).showToast();
      }
    }
  });
  
  // Simulate occasional hazard reports
  if (Math.random() > 0.9) { // 10% chance per interval
    const hazards = [
      'Accident reported on Mombasa Road near ABC Mall',
      'Heavy traffic detected on Thika Road',
      'Road construction on Waiyaki Way',
      'Flooding reported on Langata Road'
    ];
    
    const randomHazard = hazards[Math.floor(Math.random() * hazards.length)];
    addMessage(randomHazard, 'System Alert');
    
    Toastify({
      text: 'New hazard reported in your area',
      duration: 5000,
      backgroundColor: '#F59E0B',
      gravity: 'top'
    }).showToast();
  }
}, 10000); // Update every 10 seconds