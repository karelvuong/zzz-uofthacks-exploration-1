require "builder"

### ---------------------------------------------------------------------------
# Compass
### ---------------------------------------------------------------------------

# Change Compass configuration
compass_config do |config|
  config.output_style = :compact
end

### ---------------------------------------------------------------------------
# Helpers
### ---------------------------------------------------------------------------

# Methods defined in the helpers block are available in templates
helpers do
  def nav_link_to(link, url, opts={})
    current_url = current_resource.url

    if current_url.include?url_for(url)
      prefix = '<li class="active">'
    else
      prefix = '<li>'
    end

    prefix + link_to(link, url, opts) + "</li>"
  end
end

### ---------------------------------------------------------------------------
# Configurations
### ---------------------------------------------------------------------------

config[:css_dir] = 'assets/stylesheets'
config[:js_dir] = 'assets/javascript'
config[:images_dir] = 'assets/images'
config[:relative_links] = true

### ---------------------------------------------------------------------------
# Environments
### ---------------------------------------------------------------------------

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Build-specific configuration
configure :build do
  activate :minify_html
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash, :ignore => %r{^assets/images/share_facebook.jpg}
  activate :relative_assets
end

### ---------------------------------------------------------------------------
# Features
### ---------------------------------------------------------------------------

# Deploy
activate :deploy do |deploy|
  deploy.build_before = true
  deploy.method = :git
end

# Synta Highlighting
activate :syntax, :line_numbers => true

# Pretty URLs
activate :directory_indexes

### ---------------------------------------------------------------------------
# Pages
### ---------------------------------------------------------------------------
page "/sitemap.xml", layout: false
