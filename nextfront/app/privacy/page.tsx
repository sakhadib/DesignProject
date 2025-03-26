import Link from "next/link"
import { ChevronLeft, Shield } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-3 rounded-full">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>

        <div className="prose prose-purple dark:prose-invert max-w-none">
          <p className="text-muted-foreground">Last updated: March 26, 2024</p>

          <p>
            Welcome to mathXplorer. We respect your privacy and are committed to protecting your personal data. This
            privacy policy will inform you about how we look after your personal data when you visit our website and
            tell you about your privacy rights and how the law protects you.
          </p>

          <h2>1. Important Information and Who We Are</h2>
          <p>
            mathXplorer is a platform developed by Team Voyager as part of a university project for the BSc. in Software
            Engineering Program at Islamic University of Technology. This privacy policy aims to give you information on
            how we collect and process your personal data through your use of this website.
          </p>

          <h2>2. The Data We Collect About You</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped
            together as follows:
          </p>
          <ul>
            <li>
              <strong>Identity Data</strong> includes username, name, and student ID (if applicable).
            </li>
            <li>
              <strong>Contact Data</strong> includes email address.
            </li>
            <li>
              <strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time
              zone setting and location, browser plug-in types and versions, operating system and platform, and other
              technology on the devices you use to access this website.
            </li>
            <li>
              <strong>Profile Data</strong> includes your username and password, submissions, problems created, blogs
              written, preferences, feedback, and survey responses.
            </li>
            <li>
              <strong>Usage Data</strong> includes information about how you use our website, products, and services.
            </li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
            in the following circumstances:
          </p>
          <ul>
            <li>To register you as a new user.</li>
            <li>To manage our relationship with you.</li>
            <li>To enable you to participate in platform features.</li>
            <li>To administer and protect our platform.</li>
            <li>To deliver relevant content and experiences to you.</li>
            <li>
              To use data analytics to improve our website, products/services, marketing, user relationships, and
              experiences.
            </li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally
            lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your
            personal data to those team members who have a need to know. They will only process your personal data on
            our instructions, and they are subject to a duty of confidentiality.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for,
            including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>

          <h2>6. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data,
            including the right to:
          </p>
          <ul>
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>

          <h2>7. Third-Party Links</h2>
          <p>
            This website may include links to third-party websites, plug-ins, and applications. Clicking on those links
            or enabling those connections may allow third parties to collect or share data about you. We do not control
            these third-party websites and are not responsible for their privacy statements. When you leave our website,
            we encourage you to read the privacy policy of every website you visit.
          </p>

          <h2>8. Cookies</h2>
          <p>
            We use cookies to distinguish you from other users of our website. This helps us to provide you with a good
            experience when you browse our website and also allows us to improve our site.
          </p>

          <h2>9. Changes to the Privacy Policy</h2>
          <p>
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new
            privacy policy on this page.
          </p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
          <p>
            Email: team.voyager@example.com
            <br />
            Address: Islamic University of Technology, Board Bazar, Gazipur, Dhaka, Bangladesh, ZIP: 1704
          </p>

          <div className="mt-8 border-t pt-6">
            <p className="text-sm text-muted-foreground">
              This privacy policy is for educational purposes as part of a university project. In a real-world
              application, please consult with legal professionals to ensure compliance with applicable laws and
              regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

