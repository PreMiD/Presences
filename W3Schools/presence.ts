const presence = new Presence({
  clientId: '630239297521319953',
  mediaKeys: false
});

var whitelist = ['HTML', 'CSS', 'SQL', 'PHP', 'W3.CSS', 'JQUERY', 'XML'];

var elapsed, oldUrl;

presence.on('UpdateData', () => {
  var details = undefined,
    state = undefined;

  if (window.location.href !== oldUrl) {
    oldUrl = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  var language = document.querySelector('.w3-bar-item.w3-button.active');
  var lesson = document.querySelector('#main > h1');

  var exercise = document.querySelector('#completedExercisesNo');

  if (language) {
    details = 'Learning ' + capitalize(language.textContent.toLowerCase());
    if (whitelist.some(lang => lang === language.textContent))
      details = 'Learning ' + language.textContent;
  }

  if (lesson) {
    state = lesson.textContent;
  }

  if (exercise) {
    details = `${capitalize(window.location.pathname.split('/')[1])} Exercise`;
    state = exercise.textContent.match('[0-9](.*)[0-9]')[0];
  }

  var data: presenceData = {
    details: details,
    state: state,
    largeImageKey: 'w3schools',
    startTimestamp: elapsed
  };

  presence.setActivity(data);
});

function capitalize(text: string) {
  var ret = '';
  var texts = text.replace(/[\[{(_)}\]]/g, ' ').split(' ');
  texts.map(text => {
    ret += text.charAt(0).toUpperCase() + text.slice(1) + ' ';
  });
  return ret;
}
