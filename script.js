document.addEventListener("DOMContentLoaded", () => {
    // Reveal elements on scroll / load
    const elementsToReveal = [
        document.querySelector('.hero'),
        document.querySelector('.description'),
        ...document.querySelectorAll('.detail-card'),
        document.querySelector('footer')
    ];

    setTimeout(() => {
        elementsToReveal.forEach((el) => {
            if (el) {
                el.classList.add('visible');
            }
        });
    }, 100);

    // Countdown Timer to 15.06.2026
    const countdownContainer = document.getElementById('countdown');
    if (countdownContainer) {
        // Data wydarzenia z plakatu: 15 Czerwca 2026, ustawmy godzinę na 10:00 rano
        const eventDate = new Date('2026-06-15T10:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                countdownContainer.innerHTML = '<div class="countdown-value" style="color:var(--text-color);">Wydarzenie już trwa lub się zakończyło!</div>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownContainer.innerHTML = `
                <div class="countdown-box">
                    <div class="countdown-value">${days}</div>
                    <div class="countdown-label">Dni</div>
                </div>
                <div class="countdown-box">
                    <div class="countdown-value">${hours}</div>
                    <div class="countdown-label">Godz</div>
                </div>
                <div class="countdown-box">
                    <div class="countdown-value">${minutes}</div>
                    <div class="countdown-label">Min</div>
                </div>
                <div class="countdown-box">
                    <div class="countdown-value">${seconds}</div>
                    <div class="countdown-label">Sek</div>
                </div>
            `;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    const addToCalendarBtn = document.getElementById('addToCalendar');
    if (addToCalendarBtn) {
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Action Painting//Wystawa
BEGIN:VEVENT
UID:action-painting-2026
DTSTAMP:20260615T080000Z
DTSTART:20260615T080000Z
DTEND:20260615T160000Z
SUMMARY:Wystawa Action Painting
DESCRIPTION:Wystawa prac artystycznych dzieci - Sztuka nie pyta o wiek.
LOCATION:Wydział Politologii i Dziennikarstwa UMCS w Lublinie
END:VEVENT
END:VCALENDAR`;

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        if (isIOS) {
            // Rozwiązanie natywne dla iOS (uruchamia aplikację Kalendarz zamiast zapisywania pliku)
            addToCalendarBtn.href = 'data:text/calendar;charset=utf8,' + encodeURIComponent(icsContent);
        } else {
            // Android i komputery desktopowe (Blob URL przypisany z góry pozwala uniknąć blokowania przez przeglądarkę)
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            addToCalendarBtn.href = window.URL.createObjectURL(blob);
            addToCalendarBtn.setAttribute('download', 'action_painting_wystawa.ics');
        }
    }
});
