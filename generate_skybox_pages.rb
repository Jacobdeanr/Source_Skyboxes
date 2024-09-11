require 'yaml'

def get_text_color(rgb_array)
  r, g, b = rgb_array
  luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  luminance > 0.5 ? '#000000' : '#FFFFFF'
end

def write_color_parameters(file, parameter_name, values)
  file.puts "  #{parameter_name}:"
  values.each { |value| file.puts "    - #{value}" }
  color = get_text_color(values)
  file.puts "  #{parameter_name}TextColor: \"#{color}\""
end

skyboxes = YAML.load_file('_data/categories.yaml')

skyboxes.each do |skybox_name, details|
  file_name = "_skyboxes/#{File.basename(skybox_name, File.extname(skybox_name))}.md"
  File.open(file_name, 'w') do |file|
    file.puts "---"
    file.puts "layout: skybox"
    file.puts "title: #{File.basename(skybox_name, File.extname(skybox_name))} - Skybox Texture"
    file.puts "skybox_name: #{File.basename(skybox_name, File.extname(skybox_name))}"
    file.puts "description: #{details['description']}"
    file.puts "author: #{details['author']}"
    file.puts "publishDate: #{details['publishDate']}"
    file.puts "license: #{details['license']}"

    # Handle sunParameters
    if details['sunParameters']
      file.puts "sunParameters:"
      file.puts "  sunAngle: \"#{details['sunParameters']['sunAngle']}\""
      file.puts "  pitch: \"#{details['sunParameters']['pitch']}\""
      write_color_parameters(file, 'brightness', details['sunParameters']['brightness'])
      write_color_parameters(file, 'ambience', details['sunParameters']['ambience'])
    end

    # Handle fogParameters
    if details['fogParameters']
      file.puts "fogParameters:"
      write_color_parameters(file, 'primaryFogColor', details['fogParameters']['primaryFogColor'])
      write_color_parameters(file, 'secondaryFogColor', details['fogParameters']['secondaryFogColor'])
    end

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