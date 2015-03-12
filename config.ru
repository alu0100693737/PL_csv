
class MyApp
def call env
[200, {"Content-Type" => "text/html"}, ["Hello SYTW!"]]
end
end
use Rack::Static, :urls => ["/"]
run MyApp.new