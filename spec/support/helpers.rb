module Helpers
  def response_body
    JSON.parse(response.body)
  end
end
