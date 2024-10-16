// priority: 0

var seed
var log = []

// Mod shortcuts
let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let CR = (id, x) => MOD("create", id, x)
let MC = (id, x) => MOD("minecraft", id, x)
let KJ = (id, x) => MOD("kubejs", id, x)
let FD = (id, x) => MOD("farmersdelight", id, x)
let F = (id, x) => MOD("forge", id, x)
let AC = (id, x) => MOD("aquaculture", id, x)
let GS = (id, x) => MOD("garnished", id, x)
let QK = (id, x) => MOD("quark", id, x)
let DE = (id, x) => MOD("destroy", id, x)
let BC = (id, x) => MOD("createbigcannons", id, x)
let OE = (id, x) => MOD("createoreexcavation", id, x)
let CME = (id, x) => MOD("create_mechanical_extruder", id, x)
let DG = (id, x) => MOD("createdieselgenerators", id, x)
let NA = (id, x) => MOD("create_new_age", id, x)
let EI = (id, x) => MOD('create_enchantment_industry', id, x)
let VR = (id, x) => MOD("vinery", id, x)
let NVR = (id, x) => MOD("nethervinery", id, x)
let CU = (id, x) => MOD("createutilities", id, x)
let CG = (id, x) => MOD("creategoggles", id, x)
let SB = (id, x) => MOD("sophisticatedbackpacks", id, x)
let SS = (id, x) => MOD("sophisticatedstorage", id, x)
let CC = (id, x) => MOD("computercraft", id, x)
let CT = (id, x) => MOD("createteleporters", id, x)
let MKS = (id, x) => MOD("mekanism", id, x)
let KTR = (id, x) => MOD("kontraption", id, x)
let PMC = (id, x) => MOD("pneumaticcraft", id, x)
let WS = (id, x) => MOD("waystones", id, x)
let AF = (id, x) => MOD("artifacts", id, x)
let TF = (id, x) => MOD("twilightforest", id, x)


let wood_types = [MC('oak'), MC('spruce'), MC('birch'), MC('jungle'), MC('acacia'), MC('dark_oak'), MC('crimson'), MC('warped')]


function cobblegen(event, output, adjacent, below, bonks) {
    event.recipes.createMechanicalExtruderExtruding(
        Item.of(output),
        adjacent
    ).withCatalyst(below).requiredBonks(bonks);
}

function algalAndesite(event) {
  event.remove({ id: 'createmetalwork:create/compacting/andesite_alloy_from_compacting_molten_andesite_alloy'})
  event.remove({ id: 'createmetalwork:create/compacting/andesite_alloy_from_compacting_heated'})
	event.remove({ id: CR('crafting/materials/andesite_alloy') })
	event.remove({ id: CR('crafting/materials/andesite_alloy_from_zinc') })
	event.remove({ id: CR('mixing/andesite_alloy') })
	event.remove({ id: CR('mixing/andesite_alloy_from_zinc') })

	event.smelting(KJ('algal_brick'), KJ('algal_blend')).xp(0).cookingTime(120)

	event.shaped(Item.of(KJ('algal_blend'), 4), [
		'SS',
		'AA'
	], {
		A: 'minecraft:clay_ball',
		S: ['minecraft:kelp', 'minecraft:seagrass']
	})
	event.shaped(Item.of(KJ('algal_blend'), 4), [
		'AA',
		'SS'
	], {
		A: 'minecraft:clay_ball',
		S: ['minecraft:kelp', 'minecraft:seagrass']
	})
	event.shaped(Item.of(CR('andesite_alloy'), 2), [
		'SS',
		'AA'
	], {
		A: ['minecraft:andesite', CR('andesite_cobblestone')],
		S: KJ('algal_brick')
	})
	event.shaped(Item.of(CR('andesite_alloy'), 2), [
		'AA',
		'SS'
	], {
		A: ['minecraft:andesite', CR('andesite_cobblestone')],
		S: KJ('algal_brick')
	})
	event.recipes.create.mixing(Item.of(KJ('algal_blend'), 2), ['minecraft:clay_ball', 'minecraft:kelp'])
	event.recipes.create.mixing(Item.of(CR('andesite_alloy'), 2), [KJ('algal_brick'), 'minecraft:andesite'])
}

function corundumAssemblyAll(event) {
    function corundum_assembly(event, color, dye) {
        let corundum_id = QK(`${color}_corundum`)
        let inter = QK('white_corundum_pane') //test
        event.recipes.create.sequenced_assembly([
            Item.of(corundum_id)
        ], QK('white_corundum'), [
            event.recipes.createDeploying(inter, [inter, dye]),
            event.recipes.createPressing(inter, inter),
            event.recipes.createFilling(inter, [inter, Fluid.lava(500)]),
            event.recipes.createPressing(inter, inter)
        ]).transitionalItem(inter).loops(2)
    }
    let color_dye = [
        {"color":"red", "dye":'red_dye'},
        {"color":"yellow", "dye":'yellow_dye'},
        {"color":"indigo", "dye":'blue_dye'},
        {"color":"violet", "dye":'magenta_dye'},
        {"color":"black", "dye":'black_dye'},
        {"color":"blue", "dye":'light_blue_dye'},
        {"color":"green", "dye":'green_dye'}
    ]
    color_dye.forEach(function (item){
        corundum_assembly(event, item['color'], MC(item['dye']))
    })
}

function andesiteMachine(event) {
	wood_types.forEach(wood => {
		event.recipes.createCutting('2x ' + wood + '_slab', wood + '_planks').processingTime(150)
	})
    let transitional = 'kubejs:incomplete_kinetic_mechanism'
	event.recipes.createSequencedAssembly([
		'kubejs:kinetic_mechanism',
	], '#minecraft:wooden_slabs', [
		event.recipes.createDeploying(transitional, [transitional, CR('andesite_alloy')]),
		event.recipes.createDeploying(transitional, [transitional, CR('andesite_alloy')]),
		event.recipes.createDeploying(transitional, [transitional, F('#saws')])
	]).transitionalItem(transitional)
		.loops(1)
		.id('kubejs:kinetic_mechanism')

        event.shapeless(KJ('kinetic_mechanism'), [F('#saws'), CR('cogwheel'), CR('andesite_alloy'), '#minecraft:logs']).id("kubejs:kinetic_mechanism_manual_only").damageIngredient('silentgear:saw')

    // Andesite
	event.shaped(KJ('andesite_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('andesite_casing'),
		S: KJ('kinetic_mechanism')
	})

	let andesite_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), CR('andesite_alloy'), 'kubejs:andesite_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:andesite_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:andesite_machine')
	}

    andesite_machine(CR('portable_storage_interface'), 2)
    andesite_machine(CR('mechanical_drill'), 1, OE('drill'))
    andesite_machine(CR('encased_fan'), 1, CR('propeller'))
    andesite_machine(CR('mechanical_press'), 1, MC('iron_block'))
    andesite_machine(CME('mechanical_extruder'), 1, MC('lava_bucket'))
    andesite_machine(CR('mechanical_plough'), 2)
    andesite_machine(CR('mechanical_saw'), 1, Item.of('silentgear:saw'))
    andesite_machine(CR('deployer'), 1, CR('brass_hand'))
    andesite_machine(CR('mechanical_harvester'), 2)
    andesite_machine(CR('andesite_funnel'), 4)
    andesite_machine(CR('andesite_tunnel'), 4)
    andesite_machine(CR('mechanical_mixer'), 1, CR('whisk'))
    andesite_machine('sliceanddice:slicer', 1, CR('turntable'))
}

function eternalProduction(event) {
  // Eternal ingot and grains
  event.recipes.create.mixing(KJ('eternal_ingot'), [
    MC('calcite'), MC('stone'), MC('deepslate'), MC('tuff'), MC('andesite'), MC('diorite'), MC('granite'), NA('thorium', 32)])
    .superheated().id('kubejs:eternal_production')

  event.recipes.create.crushing([KJ('eternal_ingot'), KJ('grain_of_infinity')], KJ('eternal_ingot'))
  event.recipes.create.milling([KJ('eternal_ingot'), KJ('grain_of_infinity')], KJ('eternal_ingot'))
  event.recipes.create.mixing(Fluid.of(KJ('abyssal_blend'), 1000), [Fluid.water(1000), KJ('grain_of_infinity')])
  // Infinite white corundum cluster
  event.recipes.create.milling(KJ('corundum_dust'), QK('white_corundum_cluster'))
  event.recipes.create.crushing(KJ('corundum_dust'), QK('white_corundum_cluster'))
  event.recipes.shapeless(KJ('corundum_seed_1', 2), [KJ('corundum_dust'), MC('sand')])
  event.recipes.create.mixing(KJ('corundum_seed_1', 2), [KJ('corundum_dust'), MC('sand')])
  let t1 = KJ('corundum_seed_1')
  let t2 = KJ('corundum_seed_2')
  let t3 = KJ('corundum_seed_3')

  event.recipes.create.sequenced_assembly([
    KJ('corundum_seed_2')
  ], KJ('corundum_seed_1'), [
    event.recipes.create.filling(t1, [t1, Fluid.water(1000)])
  ]
  ).transitionalItem(t1).loops(4)

  event.recipes.create.sequenced_assembly([
    KJ('corundum_seed_3')
  ], KJ('corundum_seed_2'), [
    event.recipes.create.filling(t2, [t2, Fluid.water(1000)])
  ]
  ).transitionalItem(t2).loops(4)

  event.recipes.create.sequenced_assembly([
    QK('white_corundum_cluster')
  ], KJ('corundum_seed_3'), [
    event.recipes.create.filling(t3, [t3, Fluid.water(1000)])
  ]
  ).transitionalItem(t3).loops(4)
  event.custom({
    "type": "create_new_age:energising",
    "energy_needed": 1000,
    "ingredients": [
      {"item": QK('white_corundum_cluster')}],
    "results": [
      {"item": KJ('overcharged_white_corundum_cluster')}
  ]})
  event.recipes.create.mixing(
    [Fluid.of(DE('molten_cinnabar'), 333), QK('white_corundum_cluster')],
    [KJ('overcharged_white_corundum_cluster'), Fluid.of(KJ('abyssal_blend'), 333)] )
}

function brassMachine(event) {
    event.recipes.create.mixing(CR('polished_rose_quartz'), [QK('white_corundum_cluster'), Fluid.of(DE('molten_cinnabar'), 100)])
    event.recipes.createFilling(CR('electron_tube'), [CR('polished_rose_quartz'), Fluid.of(BC('molten_cast_iron'), 10)])
    event.remove({ id: CR("sequenced_assembly/precision_mechanism") })

    let t = CR('incomplete_precision_mechanism')
	event.recipes.createSequencedAssembly([
		CR('precision_mechanism'),
	], KJ('kinetic_mechanism'), [
		event.recipes.createDeploying(t, [t, CR('electron_tube')]),
		event.recipes.createDeploying(t, [t, CR('electron_tube')]),
		event.recipes.createDeploying(t, [t, F('#screwdrivers')])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:precision_mechanism')

    event.shaped(KJ('brass_machine'), [
        'SSS',
        'SCS',
        'SSS'
    ], {
        C: CR('brass_casing'),
        S: CR('precision_mechanism')
    })
    
    let brass_machine = (id, amount, other_ingredient) => {
        event.remove({ output: id })
        if (other_ingredient) {
            event.smithing(Item.of(id, amount), CR('brass_ingot'), 'kubejs:brass_machine', other_ingredient)
            event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:brass_machine', B: other_ingredient })
        }
        else
            event.stonecutting(Item.of(id, amount), 'kubejs:brass_machine')
    }

    brass_machine('create:mechanical_crafter', 3, MC('crafting_table'))
    brass_machine('create:sequenced_gearshift', 2)
    brass_machine('create:steam_engine', 1, MC('copper_block'))
    brass_machine('create:rotation_speed_controller', 1)
    brass_machine('create:mechanical_arm', 1)
    brass_machine('create:stockpile_switch', 2)
	  brass_machine('create:content_observer', 2)
    brass_machine('create:brass_funnel', 4)
	  brass_machine('create:brass_tunnel', 4)
    brass_machine('createdieselgenerators:diesel_engine', 1, 'createdieselgenerators:engine_piston')
}

function invarMachine(event) {
    event.shapeless(KJ('nickel_compound'), [DE('nickel_ingot'), MKS("dust_iron"), MKS("dust_iron"), MKS("dust_iron"), MKS("dust_iron")])
    event.blasting(KJ('invar_compound'), KJ('nickel_compound'))
    let s = KJ('invar_compound')
    event.recipes.createSequencedAssembly([
		KJ('invar_ingot'),
	], KJ('invar_compound'), [
		event.recipes.createPressing(s, s)
	]).transitionalItem(s)
		.loops(16)
		.id('kubejs:invar_ingot')

    event.recipes.create.haunting(MC('vine'), MC('twisting_vines'))
    event.recipes.create.haunting(MC('twisting_vines'), MC('warped_roots'))
    event.custom({
      "type": "farmersdelight:cutting",
      "ingredients": [
        {
          "item": MC('twisting_vines')
        }
      ],
      "result": [
        {
          "count": 2,
          "item": MC('warped_roots')
        }
      ],
      "tool": {
        "tag": "forge:tools/knives"
      }
    })

    let colors = ['blue','light_blue','green','magenta','orange','purple','red','yellow']
    colors.forEach(function (dye) {
      event.remove({id:GS('dye_blowing/quark/'+dye+'/corundum')})
      event.remove({id:GS('dye_blowing/quark/'+dye+'/corundum_pane')})
    })

    event.custom({
      "type": "destroy:arc_furnace",
      "ingredients": [
        {
          "item": MC('glass')
        },
        {
          "item": QK('myalite')
        }
      ],
      "results": [
        {
          "item": QK('violet_corundum')
        }
      ]
    })

    event.campfireCooking(MC('bone_meal'), MC('twisting_vines'))
    event.recipes.create.pressing(QK('clear_shard', 4), MC('glass'))
    event.recipes.create.emptying([Fluid.of(KJ('abyssal_blend'), 50), QK('red_corundum')], QK('violet_corundum'))
    event.recipes.create.emptying([Fluid.of(KJ('abyssal_blend'), 50), QK('indigo_corundum')], QK('red_corundum'))
    event.recipes.create.emptying([Fluid.of(KJ('abyssal_blend'), 50), QK('yellow_corundum')], QK('indigo_corundum'))
    event.recipes.create.emptying([Fluid.of(KJ('abyssal_blend'), 50), QK('green_corundum')], QK('yellow_corundum'))
    event.recipes.create.emptying([Fluid.of(KJ('abyssal_blend'), 50), QK('black_corundum')], QK('green_corundum'))
    event.recipes.create.mechanical_crafting(QK('smithing_template_rune'), 
      [
        'RI',
        'GY'],
      {R:QK('red_corundum'), I:QK('indigo_corundum'), 
      G:QK('green_corundum'), Y:QK('yellow_corundum')})
    event.remove(QK('tools/crafting/rune_duplication'))
    event.custom({
      "type": "createdieselgenerators:basin_fermenting",
      "ingredients": [
        {
          "item": QK('smithing_template_rune')
        },
        {
          "fluid": DG('ethanol'),
          "amount": 100
        }
      ],
      "processingTime": 200,
      "results": [
        {
          "item": KJ('radiant_sheet')
        },
        {
          "fluid": MC('water'),
          "amount": 100
        }
      ]
    })
    event.recipes.create.mechanical_crafting(KJ('radiant_coil'), KJ('radiant_sheet'))

    event.custom({
        "type": "create_new_age:energising",
        "energy_needed": 5000,
        "ingredients": [
          {"item": QK('red_corundum_cluster')}],
        "results": [
          {"item": KJ('overcharged_red_corundum_cluster')}
    ]})

    event.custom({
        "type": "create_new_age:energising",
        "energy_needed": 5000,
        "ingredients": [
          {"item": QK('blue_corundum_cluster')}],
        "results": [
          {"item": KJ('overcharged_blue_corundum_cluster')}
    ]})

    event.custom({
        "type": "create:item_application",
        "ingredients": [
          {
            "item": MC('stone')
          },
          {
            "item": KJ('invar_ingot')
          }
        ],
        "results": [
          {
            "item": KJ('invar_casing')
          }
        ]
      })

    let j = KJ('incomplete_inductive_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('inductive_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createDeploying(j, [j, KJ('radiant_coil')]),
		event.recipes.createDeploying(j, [j, KJ('radiant_coil')]),
		event.recipes.createDeploying(j, [j, KJ('chromatic_resonator')])
	]).transitionalItem(j)
		.loops(1)
		.id('kubejs:inductive_mechanism')

	event.shaped(KJ('machine_frame'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('invar_casing'),
		S: KJ('inductive_mechanism')
	})

    let invar_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), KJ('invar_ingot'), KJ('machine_frame'), other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: KJ('machine_frame'), B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), KJ('machine_frame'))
	}

    invar_machine(OE('drilling_machine'), 1, OE('netherite_drill'))
    invar_machine(EI('printer'), 1, CR('hose_pulley'))
}

function mekanismConversion(event) {

  event.replaceInput({id:MKS('metallurgic_infuser')}, MC('furnace'), KJ('machine_frame'))

  let replace_energy_tablet_list = [
    'resistive_heater',
    'laser',
  ]

  event.remove({id:MKS('reaction/substrate/ethene_oxygen')})
  event.custom({
    "type": "mekanism:nucleosynthesizing",
    "duration": 200,
    "gasInput": {
      "amount": 1,
      "gas": "mekanism:antimatter"
    },
    "itemInput": {
      "ingredient": {
        "item": DE("polyethene")
      }
    },
    "output": {
      "item": MKS("hdpe_pellet")
    }
  }).id("kubejs:hdpe_pellet")

  replace_energy_tablet_list.forEach(function (machine){
    event.remove(MKS(machine))
  })
  event.remove({id: 'mekanism:energy_cube/basic'})

  event.shaped(MKS('resistive_heater'), [
    'TRT',
    'RMR',
    'TAT'
  ], {
    T: MKS('ingot_tin'),
    R: MC('redstone'),
    M: KJ('machine_frame'),
    A: Item.of('createaddition:modular_accumulator')
  })

  event.shaped(MKS('basic_energy_cube'), [
    'RAR',
    'BMB',
    'RAR'
  ], {
    B: CR('brass_ingot'),
    R: MC('redstone'),
    M: KJ('machine_frame'),
    A: Item.of('createaddition:modular_accumulator')
  })

  event.shaped(MKS('laser'), [
    'LA ',
    'LMD',
    'LA '
  ], {
    L: MKS('alloy_reinforced'),
    M: KJ('machine_frame'),
    A: Item.of('createaddition:modular_accumulator'),
    D: PMC('assembly_laser')
  })

  event.remove({id: MKS('chemical_infuser')})
  event.shaped(MKS('chemical_infuser'), [
    'ACA',
    'TMT',
    'ACA'
  ], {
    A: MKS('alloy_infused'),
    C: MKS('basic_control_circuit'),
    T: MKS('basic_chemical_tank'),
    M: KJ('machine_frame'),
  })

  event.remove({id: MKS('chemical_dissolution_chamber')})
  event.shaped(MKS('chemical_dissolution_chamber'), [
    'RTR',
    'CMC',
    'RTR'
  ], {
    R: MKS('ingot_refined_obsidian'),
    C: MKS('ultimate_control_circuit'),
    T: MKS('basic_chemical_tank'),
    M: KJ('machine_frame'),
  })

  event.remove({id: MKS('chemical_washer')})
  event.shaped(MKS('chemical_washer'), [
    'RFR',
    'CMC',
    'RTR'
  ], {
    R: MKS('ingot_refined_obsidian'),
    F: MKS('basic_fluid_tank'),
    C: MKS('ultimate_control_circuit'),
    M: KJ('machine_frame'),
    T: MKS('basic_chemical_tank')
  })

  event.remove({id: MKS('digital_miner')})
  event.shaped(MKS('digital_miner'), [
    'ACA',
    'SDS',
    'TMT'
  ], {
    D: 'createoreexcavation:drilling_machine',
    A: MKS('alloy_atomic'),
    C: MKS('basic_control_circuit'),
    S: MKS('logistical_sorter'),
    M: KJ('machine_frame'),
    T: MKS('teleportation_core')
  })

  event.replaceInput({input: MKS('steel_casing')}, MKS('steel_casing'), KJ('machine_frame'))
  event.replaceInput({input: 'createaddition:capacitor'}, Item.of('createaddition:capacitor'), Item.of('pneumaticcraft:capacitor'))

  event.remove(MKS('cardboard_box'))
  let j = MKS('sawdust')
  event.recipes.createSequencedAssembly([
		MKS('cardboard_box'),
	], MKS('basic_control_circuit'), [
		event.recipes.createDeploying(j, [j, CR('super_glue')]),
    event.recipes.createDeploying(j, [j, MKS('sawdust')]),
    event.recipes.createPressing(j, j)
	]).transitionalItem(j)
		.loops(6)
		.id('kubejs:cardboard_box')

  
  event.remove({id: MKS('fluid_tank/basic')})
  let f = PMC('small_tank')
  event.recipes.createSequencedAssembly([
    MKS('basic_fluid_tank')
  ], PMC('small_tank'), [
    event.recipes.createDeploying(f, [f, MKS('basic_control_circuit')]),
    event.recipes.create.filling(f, [f, Fluid.of(EI('experience'), 50)])
  ]).transitionalItem(f)
    .loops(1)
    .id('kubejs:meka_basic_tank')

  let h = PMC('air_canister')
  event.remove({id: MKS('chemical_tank/basic')})
  event.recipes.createSequencedAssembly([
    MKS('basic_chemical_tank')
  ], PMC('air_canister'), [
    event.recipes.createDeploying(h, [h, MKS('basic_control_circuit')]),
    event.recipes.create.filling(h, [h, Fluid.of(EI('experience'), 50)])
  ]).transitionalItem(h)
    .loops(1)
    .id('kubejs:meka_basic_chemical')
}

function pneumaticcraftConversion(event) {
  event.replaceInput({input: PMC("plastic")}, PMC('plastic'), {tag: DE("plastics/rigid")})

  event.remove({id: PMC('amadron_tablet')})
  event.shaped(Item.of(PMC("amadron_tablet")), [
    'PPP',
    'PGP',
    'PAP'
  ], {
    P: {tag: DE("plastics/rigid")},
    G: PMC("gps_tool"),
    A: PMC("air_canister")
  })

  event.remove({id: PMC('pressure_chamber/capacitor')})
  event.custom({
    "type": "pneumaticcraft:pressure_chamber",
    "inputs": [
      {
        "count": 1,
        "item": 'kubejs:corundum_dust'
      },
      {
        "count": 1,
        "item": "createaddition:gold_wire"
      },
      {
        "count": 1,
        "tag": 'forge:plates/zinc'
      },
      {
        "count": 1,
        "tag": DE("plastics/rigid")
      }
    ],
    "pressure": 1.0,
    "results": [
      {
        "count": 1,
        "item": "pneumaticcraft:capacitor"
      }
    ]
  })

  event.remove({id: PMC('pressure_chamber/transistor')})
  event.custom({
    "type": "pneumaticcraft:pressure_chamber",
    "inputs": [
      {
        "count": 1,
        "item": MC('redstone')
      },
      {
        "count": 1,
        "item": "createaddition:copper_wire"
      },
      {
        "count": 1,
        "tag": DE("plastics/rigid")
      }
    ],
    "pressure": 1.0,
    "results": [
      {
        "count": 1,
        "item": "pneumaticcraft:transistor"
      }
    ]
  })

  event.remove({id: PMC("assembly/unassembled_pcb")})
  event.remove({id: DE("sequenced_assembly/circuit_board")})
  event.custom({
    "type": "destroy:circuit_sequenced_assembly",
    "ingredient": {
      "item": PMC("empty_pcb")
    },
    "transitionalItem": {
      "item": "destroy:unfinished_circuit_board"
    },
    "sequence": [
      {
        "type": "destroy:circuit_deploying",
        "ingredients": [
          {
            "tag": "forge:plates/copper"
          },
          {
            "item": "destroy:circuit_mask"
          }
        ],
        "results": [
          {
            "item": "destroy:unfinished_circuit_board"
          }
        ]
      },
      {
        "type": "create:filling",
        "ingredients": [
          {
            "item": "destroy:unfinished_circuit_board"
          },
          {
            "mixtureFluidWithSalt": "destroy:mixture",
            "cation": "destroy:copper_ii",
            "anion": "destroy:chloride",
            "min_concentration": 4.0,
            "max_concentration": 6.0,
            "amount": 1
          }
        ],
        "results": [
          {
            "item": "destroy:unfinished_circuit_board"
          }
        ]
      }
    ],
    "results": [
      {
        "item": PMC("unassembled_pcb")
      }
    ],
    "loops": 1
  })

  event.replaceInput({id: PMC('air_compressor')}, Item.of(MC('furnace')), Item.of(KJ('machine_frame')))
  event.replaceInput({id: PMC('reinforced_stone')}, Item.of(MC('stone')), Item.of(CR('andesite_alloy_block')))
  event.replaceInput({id: PMC('small_tank')}, '#forge:glass', CR('fluid_tank'))

  event.remove({id: PMC("pressure_chamber_wall")})
  event.shaped(Item.of(PMC("pressure_chamber_wall"), 16), [
    'WWW',
    'WMW',
    'WWW'
  ], {
    W: PMC("reinforced_bricks"),
    M: CR("precision_mechanism")
  })

  let g = BC('cast_iron_ingot')
  event.remove({id: 'pneumaticcraft:explosion_crafting/compressed_iron_ingot'})
  event.recipes.createSequencedAssembly([
    PMC('ingot_iron_compressed'),
  ], BC('cast_iron_ingot'), [
    event.recipes.createPressing(g, g),
    event.recipes.create.filling(g, [g, Fluid.of(MC('lava'), 100)])
  ]).transitionalItem(g)
    .loops(16)
    .id('kubejs:compressed_iron_early')

  event.remove({id: 'mekanism:control_circuit/basic'})
  event.custom({
    "type": "mekanism:metallurgic_infusing",
    "chemicalInput": {
      "amount": 10,
      "tag": "mekanism:redstone"
    },
    "itemInput": {
      "ingredient": {
        "item": "pneumaticcraft:printed_circuit_board"
      }
    },
    "output": {
      "item": "mekanism:basic_control_circuit"
    }
  })

  let j = PMC('unassembled_pcb')
  event.remove(PMC('printed_circuit_board'))
  event.recipes.createSequencedAssembly([
		PMC('printed_circuit_board'),
	], PMC('unassembled_pcb'), [
		event.recipes.createDeploying(j, [j, PMC('capacitor')]),
    event.recipes.createDeploying(j, [j, PMC('transistor')])
	]).transitionalItem(j)
		.loops(2)
		.id('kubejs:pcb')

}

function enderMachine(event) {
  event.shaped(KJ('enderium_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: 'createutilities:void_casing',
		S: KJ('abstruse_mechanism')
	})

  let j = KJ('incomplete_abstruse_mechanism')
  event.recipes.createSequencedAssembly([
		KJ('abstruse_mechanism'),
	], KJ('inductive_mechanism'), [
		event.recipes.createDeploying(j, [j, GS('ender_jelly')]),
		event.recipes.createDeploying(j, [j, GS('ender_jelly')]),
		event.recipes.createDeploying(j, [j, DE('polyethene')])
	]).transitionalItem(j)
		.loops(2)
		.id('kubejs:abstruse_mechanism')

    let enderium_machine = (id, amount, other_ingredient) => {
      event.remove({ output: id })
      if (other_ingredient) {
        event.smithing(Item.of(id, amount), GS('ender_jelly'), KJ('enderium_machine'), other_ingredient)
        event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: KJ('enderium_machine'), B: other_ingredient })
    }
    else
			event.stonecutting(Item.of(id, amount), KJ('enderium_machine'))
  }
  enderium_machine(CU('void_motor'), 1, NA('reinforced_motor'))
  enderium_machine(CU('void_chest'), 1, MC('chest'))
  enderium_machine(CU('void_tank'), 1, CR('fluid_tank'))
  enderium_machine(CU('void_battery'), 1, 'createaddition:modular_accumulator')
}

function waystonesConversion(event) {
  event.remove({id: 'waystones:sandy_waystone'})
  event.remove({id: 'waystones:mossy_waystone'})
  event.replaceInput({item: 'waystones:warp_stone'}, 'waystones:warp_stone', GS('ethereal_compound_block'))
  event.replaceInput({item: 'waystones:warp_dust'}, 'waystones:warp_dust', 'silentgear:azure_electrum_dust')
  event.replaceInput({id: 'waystones:warp_plate'}, MC('flint'), CR('precision_mechanism'))

  let to_pmc_bricks = [
    'waystone',
    'sharestone',
    'portstone',
    'warp_plate'
  ]
  to_pmc_bricks.forEach(function (waystone) {
    event.replaceInput({id: WS(waystone)}, MC('stone_bricks'), PMC('reinforced_bricks'))
  })
}

function toolsRecipes(event) {
    event.recipes.create.mixing(QK('white_corundum'), [QK('clear_shard', 2), MC('diorite', 2)]).heated()
    event.shaped(KJ('screwdriver'), [
        'S ',
        ' N'], {
            S: MC('iron_ingot'),
            N: DG('kelp_handle')
        }
    )
    event.shaped(KJ('chromatic_resonator'), [
        'S N',
        'I I',
        ' I '
    ], {
        S:KJ('overcharged_red_corundum_cluster'),
        N:KJ('overcharged_blue_corundum_cluster'),
        I:CR('iron_sheet')
    })
}

function tweaks(event) {
  let g = MC('beef')
  event.recipes.createSequencedAssembly([
    Item.of('artifacts:everlasting_beef'),
  ], MC('beef'), [
    event.recipes.create.filling(g, [g, Fluid.of(EI('hyper_experience'), 100)]),
    event.recipes.create.filling(g, [g, Fluid.of('createmetalwork:molten_gold', 1000)])
  ]).transitionalItem(g)
    .loops(10)
    .id('kubejs:everlasting_beef')

  event.remove({id: 'artifacts:eternal_steak_furnace'})
  event.remove({id: 'artifacts:eternal_steak_campfire'})
  event.remove({id: 'artifacts:eternal_steak_smoker'})
  event.recipes.create.mixing(AF('eternal_steak'), [AF('everlasting_beef'),  Fluid.of(PMC('etching_acid'), 1000) ]).superheated().id('kubejs:eternal_steak')
  
    event.recipes.create.deploying(KJ('sand_ingot_cast'), [MC('sand'), KJ('cast_ingot')])

    // redstone production tweak
    event.remove({id: 'create:filling/redstone'})
    event.recipes.createFilling(MC('redstone'), [
        Fluid.of('create:potion', 50, {Potion: "minecraft:healing"}),
        'create:cinder_flour'])

    // Custom
    event.remove('createdeco:compacting/industrial_iron_ingot')
    event.remove(QK('tweaks/crafting/elytra_duplication'))
    event.remove('create_jetpack:jetpack')
    event.remove('create_jetpack:netherite_jetpack')
    event.remove(CC('turtle_advanced/minecraft/crafting_table'))
    event.remove(CC('turtle_normal/minecraft/crafting_table'))
    event.recipes.create.splashing(MC('clay_ball', 2), MC('mud'))
    event.recipes.create.milling(Item.of(MC('sand')).withChance(0.25), MC('gravel'))
}

function garnishedToDdFreezing(event) {
  event.forEachRecipe({type: 'garnished:freezing'}, recipe => {
    let json = recipe.json
    let parsed = JSON.parse(json)
    let id = recipe.getId()
    let new_id = id.replace('garnished', 'create_dd')
    event.remove({id: id})
    parsed.type = 'create_dd:freezing'
    event.custom(parsed).id(new_id)
  })
}

function sandpaperPolishingDdSandingCompat(event) {
  event.forEachRecipe({type: 'create:sandpaper_polishing'}, recipe => {
    let json = recipe.json
    let parsed = JSON.parse(json)
    let id = recipe.getId()
    let new_id = id.replace('create', 'create_dd')
    parsed.type = 'create_dd:sanding'
    event.custom(parsed).id(new_id)
  })
}

function destroyArcFurnaceAlloysCompat(event) {
 
  
}

ServerEvents.recipes(event => {
    algalAndesite(event)
    eternalProduction(event)
    tweaks(event)
    toolsRecipes(event)
    corundumAssemblyAll(event)
    andesiteMachine(event)
    brassMachine(event)
    invarMachine(event)
    pneumaticcraftConversion(event)
    mekanismConversion(event)
    waystonesConversion(event)
    enderMachine(event)
    garnishedToDdFreezing(event)
    sandpaperPolishingDdSandingCompat(event)
    destroyArcFurnaceAlloysCompat(event)
    cobblegen(event, MC("andesite"), [MC('lava'), MC('water')], MC('bedrock'), 1)
    cobblegen(event, MC("diorite"), [MC('lava'), MC('water')], MC('nether_quartz_ore'), 1)
    cobblegen(event, MC("mud"), [MC('water'), MC('water')], MC('dirt'), 1)
})

ServerEvents.tags('item', event => {
    event.add(F("screwdrivers"), "kubejs:screwdriver")
})