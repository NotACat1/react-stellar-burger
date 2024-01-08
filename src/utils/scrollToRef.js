export default function scrollToRef(ref) {
  ref?.current?.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
}
