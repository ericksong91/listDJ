pp "Destroying old data..."

#Destroying Data
User.destroy_all
Track.destroy_all
Setlist.destroy_all
SetlistTrack.destroy_all
Tag.destroy_all
TagSetlist.destroy_all

#Requirements
require 'faker'

genres = [
    "Deep House",
    "EDM",
    "Dubstep",
    "UK Hardcore",
    "Hardstyle",
    "UK Garage",
    "Soulful House",
    "Tech House",
]

camelot_keys = [
    "1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B", "6A", "6B", "7A", "7B",
    "8A", "8B", "9A", "9B", "10A", "10B", "11A", "11B", "12A", "12B"
]

tags = [
    "#highenergy",
    "#long",
    "#dreamy",
    "#souful",
    "#multigenre",
    "#hype"
]

pp "Now Seeding Users..."

5.times do
    User.create!(username: "#{Faker::Name.first_name}##{rand(1000...9999)}", password:"asdf", 
        password_confirmation: "asdf", bio: "#{Faker::Lorem.paragraphs(number:1)[0]}")
end

User.create!(username: "DJ eric", password:"asdf", password_confirmation: "asdf", bio: "bedroom DJ")

pp "Building Tracks..."

# Length in Seconds for Tracks

20.times do
    Track.create!(name: "The #{Faker::Name.first_name} Song", genre: genres[rand(0..7)], album: "#{Faker::Name.first_name}'s Album",
    length: rand(120..600), bpm: rand(100..200), key: camelot_keys[rand(0..23)])
end

pp "Building Setlists..."

# Length in Minutes for Setlists

5.times do
    Setlist.create!(name: "#{Faker::Name.first_name} Mix", user_id: rand(User.first.id..User.last.id),  genre: genres[rand(0..7)],
    avg_bpm: rand(100..200), length: rand(120..600))
end

i = Setlist.first.id

while i <= Setlist.all.length do
    h = 1
    while h <= 20 do
        Setlist.find_by(id: i).setlist_tracks.create!(setlist_id: i, track_id: rand(Track.first.id..Track.last.id), track_order: h)
        h+=1
    end
    i+=1
end

pp "Generating Tags for Setlists..."

i = 0

while i < tags.length do
    Tag.create!(name: tags[i])
    i+=1
end

i = Setlist.first.id

while i <= Setlist.all.length do
    h = 1
    while h <= 5 do
        Setlist.find_by(id: i).tag_setlists.create!(setlist_id: i, tag_id: rand(Tag.first.id..Tag.last.id) )
        h+=1
    end
    i+=1
end

pp "Done!"



