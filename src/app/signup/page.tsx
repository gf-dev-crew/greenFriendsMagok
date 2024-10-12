import Title from '../../components/Title';
import SignUpForm from './_components/SignUpForm';

export default function Signup() {
  return (
    <section className="flex flex-col justify-center">
      <Title className="mt-3" title="회원가입" href="/signup" isMainPage={false} />
      <SignUpForm />
    </section>
  );
}
