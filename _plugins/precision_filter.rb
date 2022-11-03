module Jekyll
    module PrecisionFilter
      def precision(input, value=0)
        if input == nil
          input = 0
        end
        ("%.#{value}f" % input)
      end
    end
end
  
Liquid::Template.register_filter(Jekyll::PrecisionFilter)