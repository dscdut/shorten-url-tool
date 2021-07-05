checkFormat = (myURL) => {
  const pattern =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  return pattern.test(myURL);
};

checkNull = (inputLink, customSlug) => {
  localUrl = 'http://localhost:5000/'; // for testing on dev environment
  const baseUrl = window.location.href.match(/.*com\//i) || localUrl; // get page domain
  const body = {
    url: inputLink,
  };

  if (customSlug) body.slug = customSlug;

  window
      .fetch('/api/url', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          alert(response.error);
        } else {
          document.getElementById('output-url').value = baseUrl + response.slug;
        }
      })
      .catch((error) => console.error(error));
};

document
    .getElementById('form-submit')
    .addEventListener('submit', function(event) {
      event.preventDefault();
      let inputLink = document.getElementById('input-url').value;
      const inputCustomSlug = document.getElementById('input-slug').value;
      inputLink = inputLink.trim();
      inputSlug = inputCustomSlug.trim();
      if (checkFormat(inputLink)) {
        checkNull(inputLink, inputSlug);
      } else {
        if (checkFormat('https://' + inputLink)) {
          checkNull('https://' + inputLink, inputSlug);
        } else {
          alert('Please input your link again!');
        }
      }
    });

document.getElementById('copybt').addEventListener('click', function copy() {
  const copyText = document.getElementById('output-url');
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices*/
  document.execCommand('copy');
});

const axios = {
  post: function(url, body) {
    const xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.open('POST', url);
    xmlhttp.send(JSON.stringify(body));
  },
};
