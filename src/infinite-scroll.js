window.addEventListener('scroll', onScrollLoad);

async function onScrollLoad(e) {
  const body = document.body,
    html = document.documentElement;
  console.log(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
}
