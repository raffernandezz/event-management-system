import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiPlus, HiBell } from 'react-icons/hi';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderText, setReminderText] = useState('');

  // Dados de exemplo de eventos
  const events = [
    { id: 1, date: '2025-01-15', title: 'Evento Principal 2025', type: 'event' },
    { id: 2, date: '2025-01-20', title: 'Reunião de Planejamento', type: 'meeting' },
    { id: 3, date: '2025-01-25', title: 'Prazo de Inscrições', type: 'deadline' },
  ];

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Adicionar dias vazios do mês anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Adicionar dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateStr);
      days.push({
        day,
        date: dateStr,
        events: dayEvents,
        isToday: new Date().toDateString() === new Date(year, month, day).toDateString(),
        isSelected: selectedDate.toDateString() === new Date(year, month, day).toDateString()
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day));
    }
  };

  const handleAddReminder = () => {
    if (reminderText.trim()) {
      // Em produção, salvaria no banco de dados
      console.log('Lembrete adicionado:', reminderText, 'para', selectedDate);
      setReminderText('');
      setShowReminderModal(false);
    }
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateEvents = events.filter(event =>
    event.date === selectedDate.toISOString().split('T')[0]
  );

  return (
    <div className="bg-dark-900 rounded-xl border border-dark-700 p-6 h-full flex flex-col">
      {/* Header do Calendário */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => setShowReminderModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Lembrete</span>
        </button>
      </div>

      {/* Dias da Semana */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Dias do Mês */}
      <div className="grid grid-cols-7 gap-1 flex-1">
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`
              p-2 text-center text-sm rounded-lg cursor-pointer transition-all min-h-[60px] flex flex-col
              ${day?.isToday
                ? 'bg-primary-500/20 border border-primary-500 text-primary-400'
                : day?.isSelected
                  ? 'bg-primary-500 text-black'
                  : 'hover:bg-dark-800 text-gray-300'
              }
              ${!day ? 'cursor-default' : ''}
            `}
          >
            {day && (
              <>
                <span className={`font-medium ${day.isToday || day.isSelected ? 'text-current' : ''}`}>
                  {day.day}
                </span>
                <div className="flex-1 flex flex-col space-y-1 mt-1">
                  {day.events.map(event => (
                    <div
                      key={event.id}
                      className={`
                        text-xs px-1 py-0.5 rounded text-center
                        ${event.type === 'event' ? 'bg-blue-500/20 text-blue-400' : ''}
                        ${event.type === 'meeting' ? 'bg-green-500/20 text-green-400' : ''}
                        ${event.type === 'deadline' ? 'bg-red-500/20 text-red-400' : ''}
                      `}
                    >
                      {event.title.length > 10 ? `${event.title.substring(0, 10)}...` : event.title}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Eventos do Dia Selecionado */}
      {selectedDateEvents.length > 0 && (
        <div className="mt-6 pt-4 border-t border-dark-700">
          <h3 className="text-lg font-medium text-white mb-3">
            Eventos de {selectedDate.toLocaleDateString('pt-BR')}
          </h3>
          <div className="space-y-2">
            {selectedDateEvents.map(event => (
              <div
                key={event.id}
                className={`
                  p-3 rounded-lg border
                  ${event.type === 'event' ? 'bg-blue-500/10 border-blue-500/20' : ''}
                  ${event.type === 'meeting' ? 'bg-green-500/10 border-green-500/20' : ''}
                  ${event.type === 'deadline' ? 'bg-red-500/10 border-red-500/20' : ''}
                `}
              >
                <p className="font-medium text-white">{event.title}</p>
                <p className="text-sm text-gray-400 capitalize">{event.type}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Lembrete */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center space-x-2 mb-4">
              <HiBell className="w-5 h-5 text-primary-400" />
              <h3 className="text-lg font-semibold text-white">Adicionar Lembrete</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data: {selectedDate.toLocaleDateString('pt-BR')}
                </label>
              </div>

              <div>
                <textarea
                  value={reminderText}
                  onChange={(e) => setReminderText(e.target.value)}
                  placeholder="Digite seu lembrete..."
                  className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAddReminder}
                  className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
                >
                  Salvar Lembrete
                </button>
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-gray-300 font-medium rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;

