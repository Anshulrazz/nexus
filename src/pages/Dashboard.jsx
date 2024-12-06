import { Link } from 'react-router-dom';
import { Upload, ShieldHalf, CreditCard, Folder, Heart, UserCheck, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const stats = [
    { label: 'Projects', value: user?.project?.length, icon: Folder },
    { label: 'Credit', value: user?.credit || 0, icon: CreditCard },
    { label: 'Rank', value: user?.project?.length / 2 || 0, icon: ShieldHalf },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <br />
        <p className="text-gray-600">WELCOME BACK, {user?.name?.toUpperCase()}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6" data-aos="fade-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Followers</p>
              <p className="text-2xl font-bold text-gray-900"><CountUp end={user?.followers.length} duration={2.5} /></p>

            </div>
            <UserCheck className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6" data-aos="fade-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Collaborations</p>
              <p className="text-2xl font-bold text-gray-900"><CountUp end={user?.followers.length} duration={2.5} /></p>
            </div>
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6" data-aos="fade-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Team Name</p>
              <p className="text-2xl font-bold text-gray-900">Glitch Busters</p>
            </div>
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6" data-aos="fade-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900"><CountUp end={stat.value} duration={2.5} /></p>
              </div>
              <stat.icon className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div className="bg-white rounded-lg shadow" data-aos="fade-up">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
            </div>
          </div>
          <div className="p-6">
            {user?.project?.map((project) => (
              <Link
                key={project._id}
                to={`/details/project/${project._id}`}
                className="block hover:bg-gray-50 -mx-6 px-6 py-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-600">{project.documentation}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Heart className="h-4 w-4 mr-1" />
                    {project.likes || 0}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow">
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-white mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold">Ready to share your work?</h3>
            <p className="text-indigo-100">Upload your projects and documents to get started</p>
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload Now
          </Link>
        </div>
      </div>
    </div>
  );
}
