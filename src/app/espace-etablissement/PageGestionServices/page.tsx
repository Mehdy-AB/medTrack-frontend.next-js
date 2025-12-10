"use client";

import { useState, useMemo } from 'react';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarEtablissement from '../components/SidebarEtablissement';
import NavbarEtablissement from '../components/NavbarEtablissement';
import ServiceCard from './components/ServiceCard';
import TableServicesGestion from './components/TableServicesGestion';
import AjoutServiceModal from './components/AjoutServiceModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import ConfirmationModal from './components/ConfirmationModal';
import FilterServices from './components/FilterServices';
import SearchBarServices from './components/SearchBarServices';
import { 
  mockServices, 
  mockChefsService, 
  ServiceHospitalier, 
  ChefService,
  ConfigService,
  typeStagesOptions,
  specialitesOptions
} from './models/service.model';
import { Building, Plus, Filter, BarChart3, Users, TrendingUp, AlertTriangle } from 'lucide-react';

export default function PageGestionServices() {
  // États
  const [services, setServices] = useState<ServiceHospitalier[]>(mockServices);
  const [filteredServices, setFilteredServices] = useState<ServiceHospitalier[]>(mockServices);
  const [selectedService, setSelectedService] = useState<ServiceHospitalier | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    statut: 'tous',
    chef: 'tous',
    tauxOccupation: 'tous'
  });

  // Statistiques
  const stats = useMemo(() => {
    const total = services.length;
    const actifs = services.filter(s => s.statut === 'actif').length;
    const inactifs = services.filter(s => s.statut === 'inactif').length;
    const suspendus = services.filter(s => s.statut === 'suspendu').length;
    const sansChef = services.filter(s => !s.chefService).length;
    const surcharge = services.filter(s => s.tauxOccupation > 100).length;
    const tauxOccupationMoyen = services.reduce((acc, s) => acc + s.tauxOccupation, 0) / total;
    const etudiantsTotal = services.reduce((acc, s) => acc + s.etudiantsActifs, 0);
    const capaciteTotale = services.reduce((acc, s) => acc + s.capaciteMax, 0);

    return {
      total,
      actifs,
      inactifs,
      suspendus,
      sansChef,
      surcharge,
      tauxOccupationMoyen: Math.round(tauxOccupationMoyen),
      etudiantsTotal,
      capaciteTotale,
      tauxOccupationGlobal: Math.round((etudiantsTotal / capaciteTotale) * 100)
    };
  }, [services]);

  // Filtrage et recherche
  useMemo(() => {
    let result = services;

    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(service =>
        service.nom.toLowerCase().includes(term) ||
        service.code.toLowerCase().includes(term) ||
        service.description.toLowerCase().includes(term) ||
        service.chefService?.toLowerCase().includes(term)
      );
    }

    // Filtre par statut
    if (filters.statut !== 'tous') {
      result = result.filter(service => service.statut === filters.statut);
    }

    // Filtre par chef
    if (filters.chef === 'avec') {
      result = result.filter(service => service.chefService);
    } else if (filters.chef === 'sans') {
      result = result.filter(service => !service.chefService);
    }

    // Filtre par taux d'occupation
    if (filters.tauxOccupation !== 'tous') {
      switch (filters.tauxOccupation) {
        case 'sous-utilise':
          result = result.filter(service => service.tauxOccupation < 70);
          break;
        case 'optimal':
          result = result.filter(service => service.tauxOccupation >= 70 && service.tauxOccupation <= 90);
          break;
        case 'surcharge':
          result = result.filter(service => service.tauxOccupation > 90);
          break;
      }
    }

    setFilteredServices(result);
  }, [services, searchTerm, filters]);

  // Handlers
  const handleAddService = (config: ConfigService) => {
    const newService: ServiceHospitalier = {
      id: (services.length + 1).toString(),
      nom: config.nom,
      code: config.code,
      description: config.description,
      chefService: mockChefsService.find(c => c.id === config.chefServiceId)?.nom,
      chefServiceId: config.chefServiceId,
      capaciteMax: config.capaciteMax,
      etudiantsActifs: 0,
      tauxOccupation: 0,
      statut: 'actif',
      typeStages: config.typeStages,
      specialitesAssociees: config.specialitesAssociees,
      dateCreation: new Date().toISOString().split('T')[0],
      dateModification: new Date().toISOString().split('T')[0],
      performance: {
        noteMoyenne: 0,
        tauxPresence: 0,
        tauxSatisfaction: 0
      },
      alertes: config.chefServiceId ? [] : ['Chef de service manquant']
    };

    setServices([...services, newService]);
    setShowAddModal(false);
    alert(`Service "${config.nom}" créé avec succès !`);
  };

  const handleUpdateService = (id: string, updates: Partial<ServiceHospitalier>) => {
    setServices(services.map(service => {
      if (service.id === id) {
        const updated = {
          ...service,
          ...updates,
          dateModification: new Date().toISOString().split('T')[0]
        };
        
        // Vérifier si le chef de service a changé
        if (updates.chefServiceId && updates.chefServiceId !== service.chefServiceId) {
          const chef = mockChefsService.find(c => c.id === updates.chefServiceId);
          alert(`Notification envoyée à ${chef?.nom} pour son affectation comme chef de service`);
        }
        
        return updated;
      }
      return service;
    }));
  };

  const handleDeleteService = (id: string) => {
    const service = services.find(s => s.id === id);
    if (service && service.etudiantsActifs > 0) {
      alert('Impossible de supprimer un service avec des étudiants actifs');
      return;
    }

    setServices(services.filter(service => service.id !== id));
    setShowDeleteModal(false);
    alert('Service supprimé avec succès');
  };

  const handleChangeStatut = (id: string, statut: ServiceHospitalier['statut']) => {
    handleUpdateService(id, { statut });
    if (statut === 'inactif') {
      alert('Les nouvelles candidatures pour ce service sont maintenant suspendues');
    }
  };

  const handleAssignChef = (serviceId: string, chefId: string) => {
    const chef = mockChefsService.find(c => c.id === chefId);
    handleUpdateService(serviceId, {
      chefServiceId: chefId,
      chefService: chef?.nom,
      alertes: [] // Retirer l'alerte de chef manquant
    });
    setShowAssignModal(false);
  };

  const handleEditTable = (service: ServiceHospitalier) => {
    setSelectedService(service);
    setShowAddModal(true);
  };

  const handleViewDetailTable = (service: ServiceHospitalier) => {
    setSelectedService(service);
    setShowDetailModal(true);
  };

  return (
    <>
      <NavbarEtablissement />
      <Header spaceName="Espace Établissement" notificationCount={stats.sansChef} />
      
      <div className="flex min-h-screen bg-white">
        <SidebarEtablissement />
        
        {/* Contenu principal */}
        <main className="flex-1 overflow-x-hidden">
          <div className="p-8">
            {/* En-tête avec statistiques */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Gestion des Services Hospitaliers
                  </h1>
                  <p className="text-gray-600">
                    Créer, modifier, organiser et superviser l'ensemble des services médicaux
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Nouveau Service
                </button>
              </div>

              {/* Cartes de statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Services Totaux</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <Building className="w-8 h-8 text-teal-500" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {stats.actifs} actifs
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                      {stats.inactifs} inactifs
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Taux d'Occupation</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.tauxOccupationGlobal}%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          stats.tauxOccupationGlobal < 70 ? 'bg-green-500' :
                          stats.tauxOccupationGlobal <= 90 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(stats.tauxOccupationGlobal, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Étudiants Actifs</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.etudiantsTotal}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Capacité totale: {stats.capaciteTotale}
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Services sans Chef</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.sansChef}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  {stats.sansChef > 0 && (
                    <p className="text-sm text-red-600 mt-2">
                      Nécessite attention immédiate
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SearchBarServices onSearch={setSearchTerm} />
                </div>
                <div className="w-full md:w-auto">
                  <FilterServices
                    filters={filters}
                    onFilterChange={setFilters}
                    services={services}
                  />
                </div>
              </div>
            </div>

            {/* Vue cartes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Services ({filteredServices.length})
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Actif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span>Inactif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>Sans chef</span>
                  </div>
                </div>
              </div>

              {filteredServices.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <p className="text-gray-500">Aucun service ne correspond aux critères</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map(service => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onViewDetail={() => {
                        setSelectedService(service);
                        setShowDetailModal(true);
                      }}
                      onEdit={() => {
                        setSelectedService(service);
                        setShowAddModal(true);
                      }}
                      onDelete={() => {
                        setSelectedService(service);
                        setShowDeleteModal(true);
                      }}
                      onChangeStatut={(statut) => handleChangeStatut(service.id, statut)}
                      onAssignChef={() => {
                        setSelectedService(service);
                        setShowAssignModal(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Vue tableau */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vue Synthétique
              </h3>
              <TableServicesGestion
                services={filteredServices}
                onEdit={handleEditTable}
                onViewDetail={handleViewDetailTable}
              />
            </div>
          </div>
        </main>
      </div>
      
      <Footer />

      {/* Modals */}
      <AjoutServiceModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSelectedService(null);
        }}
        onSave={selectedService ? 
          (config) => handleUpdateService(selectedService.id, {
            nom: config.nom,
            code: config.code,
            description: config.description,
            chefServiceId: config.chefServiceId,
            chefService: mockChefsService.find(c => c.id === config.chefServiceId)?.nom,
            capaciteMax: config.capaciteMax,
            typeStages: config.typeStages,
            specialitesAssociees: config.specialitesAssociees
          }) : 
          handleAddService
        }
        chefsService={mockChefsService}
        typeStagesOptions={typeStagesOptions}
        specialitesOptions={specialitesOptions}
        serviceToEdit={selectedService}
        isEditing={!!selectedService}
      />

      <ServiceDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        service={selectedService}
        chefsService={mockChefsService}
        onAssignChef={handleAssignChef}
        onChangeStatut={(statut) => {
          if (selectedService) {
            handleChangeStatut(selectedService.id, statut);
          }
        }}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (selectedService) {
            handleDeleteService(selectedService.id);
          }
        }}
        title="Supprimer le service"
        message={`Êtes-vous sûr de vouloir supprimer le service "${selectedService?.nom}" ? Cette action est irréversible.`}
        type="danger"
      />

      <ConfirmationModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onConfirm={() => {
          if (selectedService) {
            // Dans une vraie application, on aurait une sélection de chef
            const availableChef = mockChefsService.find(c => !c.serviceActuel);
            if (availableChef) {
              handleAssignChef(selectedService.id, availableChef.id);
            }
          }
        }}
        title="Affecter un chef de service"
        message={`Affecter un chef de service à "${selectedService?.nom}" ? Une notification sera envoyée automatiquement.`}
        type="warning"
      />
    </>
  );
}