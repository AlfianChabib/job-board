import LinkButton from '../elements/LinkButton';

export default function DefaultMenu() {
  return (
    <div className="ml-auto flex items-center space-x-4">
      <LinkButton variant="outline" href="/login/user" className="hover:text-primary">
        Get Started
      </LinkButton>
      <LinkButton variant="default" href="/login/company">
        For Company
      </LinkButton>
    </div>
  );
}
