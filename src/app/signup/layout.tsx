export const revalidate = 60; // 60초마다 재검증

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <div className="px-4 pb-6 pt-4">{children}</div>;
}
