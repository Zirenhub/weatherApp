const appendDom = (err, errorPara, parent) => {
  if (err.cod === '404') {
    errorPara.textContent = 'Location could not be found.';
  } else if (err.cod === '400') {
    errorPara.textContent =
      "Can't search for a non existing location.";
  }
  parent.appendChild(errorPara);
};

const errorHandling = (err) => {
  console.log(err);

  const parent = document.querySelector('.search-content');

  if (document.querySelector('.error-para')) {
    const errorPara = document.querySelector('.error-para');

    appendDom(err, errorPara, parent);
  } else {
    const errorPara = document.createElement('p');
    errorPara.classList.add('error-para');

    appendDom(err, errorPara, parent);
  }
};

export { errorHandling };
