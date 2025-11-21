'use client'

import { useState } from 'react'
import { Camera, MapPin, Users, Settings, Plus, Heart, MessageCircle, Share2, Search } from 'lucide-react'

interface Vehicle {
  id: string
  username: string
  avatar: string
  vehicleType: 'car' | 'bike'
  make: string
  model: string
  year: string
  image: string
  specs: string[]
  mods: string[]
  likes: number
  comments: number
  location?: string
}

interface Meetup {
  id: string
  name: string
  location: string
  date: string
  attendees: number
  description: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'feed' | 'meetups' | 'profile'>('feed')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      username: 'TurboMike',
      avatar: '🏎️',
      vehicleType: 'car',
      make: 'Honda',
      model: 'Civic Type R',
      year: '2023',
      image: '🚗',
      specs: ['2.0L Turbo', '306 HP', '6-Speed Manual'],
      mods: ['Cold Air Intake', 'Cat-back Exhaust', 'Lowering Springs', 'Aftermarket Wheels'],
      likes: 127,
      comments: 23,
      location: 'Los Angeles, CA'
    },
    {
      id: '2',
      username: 'BikerJane',
      avatar: '🏍️',
      vehicleType: 'bike',
      make: 'Kawasaki',
      model: 'Ninja ZX-6R',
      year: '2022',
      image: '🏍️',
      specs: ['636cc Inline-4', '130 HP', '6-Speed'],
      mods: ['Akrapovic Exhaust', 'Rear Sets', 'Frame Sliders', 'LED Headlights'],
      likes: 94,
      comments: 17,
      location: 'Miami, FL'
    },
    {
      id: '3',
      username: 'MuscleMatt',
      avatar: '💪',
      vehicleType: 'car',
      make: 'Dodge',
      model: 'Challenger Hellcat',
      year: '2021',
      image: '🚙',
      specs: ['6.2L Supercharged V8', '717 HP', '8-Speed Auto'],
      mods: ['Pulley Upgrade', 'Cold Air Intake', 'Custom Tune', 'Drag Radials'],
      likes: 203,
      comments: 45,
      location: 'Dallas, TX'
    }
  ])

  const [meetups, setMeetups] = useState<Meetup[]>([
    {
      id: '1',
      name: 'Sunday Morning Cars & Coffee',
      location: 'Santa Monica Pier, CA',
      date: '2025-11-24',
      attendees: 156,
      description: 'Weekly meetup for all car enthusiasts. Bring your ride and enjoy good coffee!'
    },
    {
      id: '2',
      name: 'Bike Night at the Marina',
      location: 'Miami Marina, FL',
      date: '2025-11-23',
      attendees: 89,
      description: 'Two-wheel enthusiasts gather every Friday. All bikes welcome!'
    },
    {
      id: '3',
      name: 'Drag Racing Event',
      location: 'Texas Motor Speedway, TX',
      date: '2025-11-30',
      attendees: 312,
      description: 'Official drag racing event. Come race or watch the action!'
    }
  ])

  const [uploadForm, setUploadForm] = useState({
    vehicleType: 'car',
    make: '',
    model: '',
    year: '',
    specs: '',
    mods: '',
    location: ''
  })

  const handleLike = (vehicleId: string) => {
    setVehicles(vehicles.map(v =>
      v.id === vehicleId ? { ...v, likes: v.likes + 1 } : v
    ))
  }

  const handleUpload = () => {
    if (!uploadForm.make || !uploadForm.model || !uploadForm.year) return

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      username: 'You',
      avatar: '👤',
      vehicleType: uploadForm.vehicleType as 'car' | 'bike',
      make: uploadForm.make,
      model: uploadForm.model,
      year: uploadForm.year,
      image: uploadForm.vehicleType === 'car' ? '🚗' : '🏍️',
      specs: uploadForm.specs.split(',').map(s => s.trim()).filter(Boolean),
      mods: uploadForm.mods.split(',').map(m => m.trim()).filter(Boolean),
      likes: 0,
      comments: 0,
      location: uploadForm.location
    }

    setVehicles([newVehicle, ...vehicles])
    setShowUploadModal(false)
    setUploadForm({
      vehicleType: 'car',
      make: '',
      model: '',
      year: '',
      specs: '',
      mods: '',
      location: ''
    })
  }

  const filteredVehicles = vehicles.filter(v =>
    searchQuery === '' ||
    v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredMeetups = meetups.filter(m =>
    searchQuery === '' ||
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🏁</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                GearHeads Hub
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Share Your Ride</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'feed'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Camera className="w-5 h-5" />
              Feed
            </button>
            <button
              onClick={() => setActiveTab('meetups')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'meetups'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <MapPin className="w-5 h-5" />
              Meetups
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Users className="w-5 h-5" />
              Community
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'feed' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-red-500/50 transition-all"
              >
                {/* User Header */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                  <div className="text-3xl">{vehicle.avatar}</div>
                  <div>
                    <div className="font-semibold">{vehicle.username}</div>
                    {vehicle.location && (
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {vehicle.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Vehicle Image */}
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 h-48 flex items-center justify-center text-8xl">
                  {vehicle.image}
                </div>

                {/* Vehicle Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-red-500">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <span className="text-xs text-gray-400 uppercase">
                      {vehicle.vehicleType}
                    </span>
                  </div>

                  {/* Specs */}
                  {vehicle.specs.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-300 mb-1">Specs:</div>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.specs.map((spec, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-700 px-2 py-1 rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mods */}
                  {vehicle.mods.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-300 mb-1">Mods:</div>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.mods.map((mod, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-orange-900/30 text-orange-400 px-2 py-1 rounded"
                          >
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2 border-t border-gray-700">
                    <button
                      onClick={() => handleLike(vehicle.id)}
                      className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-semibold">{vehicle.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-semibold">{vehicle.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors ml-auto">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'meetups' && (
          <div className="space-y-4">
            {filteredMeetups.map((meetup) => (
              <div
                key={meetup.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-red-500 mb-2">{meetup.name}</h3>
                    <div className="flex items-center gap-2 text-gray-300 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{meetup.location}</span>
                    </div>
                    <div className="text-gray-400 mb-3">{meetup.description}</div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{meetup.attendees} attending</span>
                      </div>
                      <div className="text-gray-400">
                        📅 {new Date(meetup.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 px-6 py-2 rounded-lg font-semibold transition-all">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-3xl font-bold mb-4">Community Stats</h2>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-red-500">{vehicles.length}</div>
                  <div className="text-gray-400 text-sm">Rides Shared</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-orange-500">{meetups.length}</div>
                  <div className="text-gray-400 text-sm">Upcoming Events</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-500">
                    {meetups.reduce((sum, m) => sum + m.attendees, 0)}
                  </div>
                  <div className="text-gray-400 text-sm">Total Members</div>
                </div>
              </div>
              <div className="mt-8 text-gray-400">
                Connect with fellow gearheads, share your passion, and discover amazing rides!
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-red-500">Share Your Ride</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Vehicle Type
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setUploadForm({ ...uploadForm, vehicleType: 'car' })}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      uploadForm.vehicleType === 'car'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    🚗 Car
                  </button>
                  <button
                    onClick={() => setUploadForm({ ...uploadForm, vehicleType: 'bike' })}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      uploadForm.vehicleType === 'bike'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    🏍️ Bike
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Make *
                  </label>
                  <input
                    type="text"
                    value={uploadForm.make}
                    onChange={(e) => setUploadForm({ ...uploadForm, make: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Honda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    value={uploadForm.model}
                    onChange={(e) => setUploadForm({ ...uploadForm, model: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Civic"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Year *
                  </label>
                  <input
                    type="text"
                    value={uploadForm.year}
                    onChange={(e) => setUploadForm({ ...uploadForm, year: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="2023"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Specs (comma-separated)
                </label>
                <input
                  type="text"
                  value={uploadForm.specs}
                  onChange={(e) => setUploadForm({ ...uploadForm, specs: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="2.0L Turbo, 306 HP, 6-Speed Manual"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Mods (comma-separated)
                </label>
                <input
                  type="text"
                  value={uploadForm.mods}
                  onChange={(e) => setUploadForm({ ...uploadForm, mods: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Cold Air Intake, Cat-back Exhaust, Lowering Springs"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={uploadForm.location}
                  onChange={(e) => setUploadForm({ ...uploadForm, location: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Los Angeles, CA"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-lg font-semibold transition-all"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
