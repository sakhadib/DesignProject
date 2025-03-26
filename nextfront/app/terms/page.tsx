import Link from "next/link"
import { ChevronLeft, FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <Link href="/" passHref>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-3 rounded-full">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
        </div>

        <div className="prose prose-lg text-gray-800 dark:prose-invert max-w-none">
          <p className="text-muted-foreground">Last updated: March 26, 2024</p>

          <p>Please read these terms and conditions carefully before using the mathXplorer platform.</p>

          <h2>1. Introduction</h2>
          <p>
            These Terms and Conditions govern your use of mathXplorer, a platform developed by Team Voyager as part of a
            university project for the BSc. in Software Engineering Program at Islamic University of Technology. By
            accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of the
            terms, you may not access the platform.
          </p>

          <h2>2. Definitions</h2>
          <ul>
            <li>
              <strong>"Platform"</strong> refers to the mathXplorer website.
            </li>
            <li>
              <strong>"User"</strong> refers to any individual who accesses or uses the Platform.
            </li>
            <li>
              <strong>"Content"</strong> refers to problems, solutions, blogs, comments, and any other material posted
              on the Platform.
            </li>
            <li>
              <strong>"Team Voyager"</strong> refers to the developers of the Platform.
            </li>
          </ul>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at
            all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
            your account on our Platform.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Platform and for any activities
            or actions under your password. You agree not to disclose your password to any third party. You must notify
            us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            The Platform and its original content, features, and functionality are and will remain the exclusive
            property of Team Voyager and its licensors. The Platform is protected by copyright, trademark, and other
            laws of both Bangladesh and foreign countries. Our trademarks and trade dress may not be used in connection
            with any product or service without the prior written consent of Team Voyager.
          </p>

          <h2>5. User Content</h2>
          <p>
            Our Platform allows you to post, link, store, share and otherwise make available certain information, text,
            graphics, videos, or other material. You are responsible for the Content that you post on or through the
            Platform, including its legality, reliability, and appropriateness.
          </p>
          <p>By posting Content on or through the Platform, you represent and warrant that:</p>
          <ul>
            <li>
              The Content is yours (you own it) or you have the right to use it and grant us the rights and license as
              provided in these Terms.
            </li>
            <li>
              The posting of your Content on or through the Platform does not violate the privacy rights, publicity
              rights, copyrights, contract rights or any other rights of any person.
            </li>
          </ul>

          <h2>6. Acceptable Use</h2>
          <p>You agree not to use the Platform:</p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>
              To transmit, or procure the sending of, any advertising or promotional material, including any "junk
              mail", "chain letter," "spam," or any other similar solicitation.
            </li>
            <li>
              To impersonate or attempt to impersonate Team Voyager, a Team Voyager employee, another user, or any other
              person or entity.
            </li>
            <li>
              To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Platform, or
              which, as determined by us, may harm Team Voyager or users of the Platform or expose them to liability.
            </li>
          </ul>

          <h2>7. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            Upon termination, your right to use the Platform will immediately cease. If you wish to terminate your
            account, you may simply discontinue using the Platform.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall Team Voyager, nor its directors, employees, partners, agents, suppliers, or affiliates, be
            liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the Platform;</li>
            <li>Any conduct or content of any third party on the Platform;</li>
            <li>Any content obtained from the Platform; and</li>
            <li>Unauthorized access, use or alteration of your transmissions or content.</li>
          </ul>

          <h2>9. Disclaimer</h2>
          <p>
            Your use of the Platform is at your sole risk. The Platform is provided on an "AS IS" and "AS AVAILABLE"
            basis. The Platform is provided without warranties of any kind, whether express or implied, including, but
            not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or
            course of performance.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its
            conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
            rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
            provisions of these Terms will remain in effect.
          </p>

          <h2>11. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material we will try to provide at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </p>

          <h2>12. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            Email: team.voyager@example.com
            <br />
            Address: Islamic University of Technology, Board Bazar, Gazipur, Dhaka, Bangladesh, ZIP: 1704
          </p>

          <div className="mt-8 border-t pt-6">
            <p className="text-sm text-muted-foreground">
              These terms and conditions are for educational purposes as part of a university project. In a real-world
              application, please consult with legal professionals to ensure compliance with applicable laws and
              regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
