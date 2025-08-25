const supabase = require('./supabaseClient');

exports.readQuotes = async () => {
  const { data, error } = await supabase
    .from('quotes')
    .select('*');

  if (error) throw error;
  return data;
};

exports.writeQuote = async (quote) => {
  const { data, error } = await supabase
    .from('quotes')
    .insert([quote]);

  if (error) throw error;
  return data;
};

exports.updateQuotes = async (updates) => {
  const updatePromises = updates.map((quote) => {
    return supabase
      .from('quotes')
      .update({
        wins: quote.wins,
        losses: quote.losses
      })
      .eq('id', quote.id);
  });

  return Promise.all(updatePromises);
};