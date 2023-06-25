# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

pp "Destroying old data..."

#Destroying Data
User.destroy_all
Track.destroy_all
Setlist.destroy_all
SetlistTrack.destroy_all
Tags.destroy_all
TagsSetlist.destroy_all

#Requirements
require 'faker'