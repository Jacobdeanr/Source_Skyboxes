require 'yaml'

def get_text_color(rgb_array)
  r, g, b = rgb_array
  luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  luminance > 0.5 ? '#000000' : '#FFFFFF'
end

skyboxes = YAML.load_file('_data/categories.yaml')

skyboxes.each do |skybox_name, details|
  File.open("_skyboxes/#{skybox_name.split('.').first}.md", 'w') do |file|
    file.puts "---"
    file.puts "layout: skybox"
    file.puts "title: #{skybox_name.split('.').first}"
    file.puts "skybox_name: #{skybox_name.split('.').first}"
    file.puts "description: #{details['description']}"
    file.puts "author: #{details['author']}"
    file.puts "publishDate: #{details['publishDate']}"
    file.puts "license: #{details['license']}"
    
    # Handle sunParameters
    file.puts "sunParameters:"
    file.puts "  sunAngle: \"#{details['sunParameters']['sunAngle']}\""
    file.puts "  pitch: \"#{details['sunParameters']['pitch']}\""
    file.puts "  brightness:"
    details['sunParameters']['brightness'].each do |value|
      file.puts "    - #{value}"
    end
    brightness_color = get_text_color(details['sunParameters']['brightness'])
    file.puts "  brightnessTextColor: \"#{brightness_color}\""

    file.puts "  ambience:"
    details['sunParameters']['ambience'].each do |value|
      file.puts "    - #{value}"
    end
    ambience_color = get_text_color(details['sunParameters']['ambience'])
    file.puts "  ambienceTextColor: \"#{ambience_color}\""
    
    # Handle fogParameters
    file.puts "fogParameters:"
    file.puts "  primaryFogColor:"
    details['fogParameters']['primaryFogColor'].each do |value|
      file.puts "    - #{value}"
    end
    primary_fog_color = get_text_color(details['fogParameters']['primaryFogColor'])
    file.puts "  primaryFogTextColor: \"#{primary_fog_color}\""

    file.puts "  secondaryFogColor:"
    details['fogParameters']['secondaryFogColor'].each do |value|
      file.puts "    - #{value}"
    end
    secondary_fog_color = get_text_color(details['fogParameters']['secondaryFogColor'])
    file.puts "  secondaryFogTextColor: \"#{secondary_fog_color}\""

    file.puts "download_link: https://raw.githubusercontent.com/Jacobdeanr/Source_Skyboxes/master/#{skybox_name}"
    
    # Handle steamMaps
    if details['steamMaps']
      file.puts "steamMaps:"
      details['steamMaps'].each do |map|
        file.puts "  - name: #{map['name']}"
        file.puts "    url: #{map['url']}"
      end
    end
    
    file.puts "---"
  end
end
